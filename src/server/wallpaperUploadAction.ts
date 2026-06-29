"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import sharp from "sharp";
import slugify from "slugify";
const wallpaperUploadAction = async (formData: FormData) => {
  let filePath = "";
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        isSuccess: false,
        message: "Please login first.",
      };
    }

    const image = formData.get("image") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const categoryId = formData.get("category") as string;
    const tags = JSON.parse(formData.get("tags") as string) as string[];

    if (!image) {
      return {
        isSuccess: false,
        message: "Please select an image.",
      };
    }

    // File size validation
    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    if (image.size > MAX_FILE_SIZE) {
      return {
        isSuccess: false,
        message: "Image size must be less than 10MB.",
      };
    }

    // Convert File -> Buffer
    const buffer = Buffer.from(await image.arrayBuffer());

    // Get image all information like hight width
    const metadata = await sharp(buffer).metadata();

    // image formats
    const allowedFormats = ["png", "jpeg", "webp"];

    if (!metadata.format || !allowedFormats.includes(metadata.format)) {
      return {
        isSuccess: false,
        message: "Only PNG, JPG, JPEG, and WEBP images are allowed.",
      };
    }

    // Check category
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return {
        isSuccess: false,
        message: "Invalid category.",
      };
    }

    // Image name
    const extension = metadata.format === "jpeg" ? "jpg" : metadata.format;

    const imgId = `${nanoid(8)}.${extension}`;

    // image path
    filePath = `./public/wallpapers/${imgId}`;

    // Save image
    await sharp(buffer).toFile(filePath);

    // convert tittle in to slug
    const baseSlug = slugify(title, {
      lower: true,
      strict: true,
    });

    let customSlug = baseSlug;

    const checkSlug = await prisma.wallpaper.findUnique({
      where: {
        slug: customSlug,
      },
    });

    if (checkSlug) {
      customSlug = `${baseSlug}-${nanoid(6)}`;
    }

    // Create wallpaper
    await prisma.wallpaper.create({
      data: {
        title,

        description,

        slug: customSlug,

        imageUrl: imgId,

        categoryId,

        userId: session.user.id,

        width: metadata.width,

        height: metadata.height,

        fileSize: image.size,

        format: metadata.format,

        wallpaperTags: {
          create: tags.map((tagId) => ({
            tagId,
          })),
        },
      },
    });

    revalidatePath("/");

    return {
      isSuccess: true,
      message: "Wallpaper uploaded successfully.",
    };
  } catch (error) {
    console.error(error);

    // Delete image if DB failed
    if (filePath) {
      await fs.unlink(filePath).catch(() => {});
    }

    return {
      isSuccess: false,
      message: "Something Went Wrong!",
    };
  }
};

export default wallpaperUploadAction;

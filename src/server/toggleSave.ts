"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { headers } from "next/headers";

const toggleSave = async (wallpaperId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        isSuccess: false,
        message: "Please login first.",
      };
    }

    // Only allow public wallpapers to be saved
    const wallpaper = await prisma.wallpaper.findFirst({
      where: {
        id: wallpaperId,
        isPublic: true,
      },
      select: {
        userId: true,
      },
    });

    if (!wallpaper) {
      return {
        isSuccess: false,
        message: "Wallpaper not found.",
      };
    }

    if (wallpaper?.userId === session.user.id) {
      return {
        isSuccess: false,
        message: "You cannot save your own wallpaper",
      };
    }

    const existSavedPost = await prisma.savedPost.findUnique({
      where: {
        userId_wallpaperId: {
          userId: session.user.id,
          wallpaperId,
        },
      },
    });

    let saved = false;

    if (existSavedPost) {
      await prisma.savedPost.delete({
        where: {
          userId_wallpaperId: {
            userId: session.user.id,
            wallpaperId,
          },
        },
      });
      saved = false;
    } else {
      await prisma.savedPost.create({
        data: {
          userId: session.user.id,
          wallpaperId,
        },
      });

      saved = true;
    }

    return {
      isSuccess: true,
      saved,
      message: saved ? "Wallpaper saved." : "Save removed.",
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      message: "Something went wrong.",
    };
  }
};

export default toggleSave;

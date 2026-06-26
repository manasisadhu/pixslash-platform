"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { commentSchema } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
type commentProps = {
  wallpaperId: string;
  commentText: string;
};

const comment = async ({ wallpaperId, commentText }: commentProps) => {
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

    const validated = commentSchema.safeParse({
      commentText,
    });

    if (!validated.success) {
      return {
        isSuccess: false,
        message: validated.error.issues[0]?.message,
      };
    }

    const cleanedOpinion = commentText.trim();

    await prisma.comment.create({
      data: {
        userId: session.user.id,
        wallpaperId,
        opinion: cleanedOpinion,
      },
      select: {
        id: true,
        opinion: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    revalidatePath(`/photo/${wallpaperId}`);
    return {
      isSuccess: true,
      message: "Comment added succefully !",
    };
  } catch (error) {
    console.error(error);

    return {
      isSuccess: false,
      message: "Something went wrong.",
    };
  }
};

export default comment;

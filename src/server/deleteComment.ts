"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const deleteComment = async (commentId: string) => {
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

    // Find the comment first and get the real wallpaperId
    const comment = await prisma.comment.findFirst({
      where: {
        id: commentId,
        userId: session.user.id,
      },
      select: {
        wallpaperId: true,
      },
    });

    if (!comment) {
      return {
        isSuccess: false,
        message: "Comment not found.",
      };
    }

    // Delete comment
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    // Revalidate the actual wallpaper page
    revalidatePath(`/photo/${comment.wallpaperId}`);

    return {
      isSuccess: true,
      message: "Comment deleted.",
    };
  } catch (error) {
    console.error(error);

    return {
      isSuccess: false,
      message: "Something went wrong.",
    };
  }
};

export default deleteComment;

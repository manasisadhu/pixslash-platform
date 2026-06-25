"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const deleteComment = async (commentId: string, wallpaperId: string) => {
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

    const result = await prisma.comment.deleteMany({
      where: {
        id: commentId,
        userId: session.user.id, // Only delete own comment
      },
    });

    if (result.count === 0) {
      return {
        isSuccess: false,
        message: "Comment not found or you are not authorized to delete it.",
      };
    }

    revalidatePath(`/photo/${wallpaperId}`);

    return {
      isSuccess: true,
      message: "Comment deleted successfully.",
    };
  } catch (error) {
    console.error("Delete Comment Error:", error);

    return {
      isSuccess: false,
      message: "Something went wrong.",
    };
  }
};

export default deleteComment;

"use client";

import deleteComment from "@/server/deleteComment";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import { Spinner } from "../shadcnui/spinner";

type DeleteCommentButtonProps = {
  commentId: string;
  wallpaperId: string;
};

const DeleteCommentButton = ({
  commentId,
  wallpaperId,
}: DeleteCommentButtonProps) => {
  const { refresh } = useRouter();
  const [loading, setLoading] = useState(false);
  const deleteCommentHandler = async () => {
    setLoading(true);

    const { isSuccess, message } = await deleteComment(commentId, wallpaperId);

    if (!isSuccess) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
      refresh();
    }

    setLoading(false);
  };

  return (
    <Button
      type="button"
      variant="destructive"
      className="w-full"
      disabled={loading}
      onClick={deleteCommentHandler}>
      {loading ?
        <>
          <Spinner />
          Deleting...
        </>
      : <>
          <Trash2Icon />
          Delete
        </>
      }
    </Button>
  );
};

export default DeleteCommentButton;

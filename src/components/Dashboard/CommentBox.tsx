"use client";

import { Input } from "../shadcnui/input";

const CommentBox = () => {
  return (
    <form className="w-full">
      <Input
        placeholder="Add a comment..."
        className="focus-visible:border-b-foreground bg-white-0 rounded-none border-x-0 border-t-0 bg-transparent! px-2 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </form>
  );
};

export default CommentBox;

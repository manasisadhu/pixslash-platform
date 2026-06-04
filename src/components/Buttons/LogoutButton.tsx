"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";

const LogoutButton = () => {
  const { replace } = useRouter();

  const logoutHandler = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error(error);
        toast.error("Failed to log out. Please try again.");
      } else {
        toast.success("Logged out successfully.");
        replace("/");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <Button
      type="button"
      className="bg-red-500 text-white hover:bg-red-400"
      onClick={logoutHandler}>
      Logout
    </Button>
  );
};

export default LogoutButton;

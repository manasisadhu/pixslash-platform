"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const authenticUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return {
      isSuccess: true,
      data: session,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error("authenticUser.getSession failed", {
      message,
    });

    return {
      isSuccess: false,
      data: null,
    };
  }
};

export default authenticUser;

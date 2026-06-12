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
    console.error(error);

    return {
      isSuccess: false,
      data: null,
    };
  }
};

export default authenticUser;

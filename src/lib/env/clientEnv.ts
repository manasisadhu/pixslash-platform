import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const clientEnv = createEnv({
  client: {
    /** The base URL of the server (optional if you're using the same domain) */
    NEXT_PUBLIC_BETTER_AUTH_URL: z.url().optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  },
});

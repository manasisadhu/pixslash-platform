import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z
      .string()
      .startsWith("file:./", {
        error: "DATABASE_URL must start with file:./",
      })
      .min(1, { error: "DATABASE_URL is required" }),

    BETTER_AUTH_SECRET: z
      .string()
      .min(32, { error: "  BETTER_AUTH_SECRET is required" }),

    BETTER_AUTH_URL: z.url({ error: "BETTER_AUTH_URL is required" }),

    CHECKPOINT_DISABLE: z.enum(["1", "0"]).optional(),

    BETTER_AUTH_TELEMETRY: z.enum(["1", "0"]).optional(),

    GOOGLE_CLIENT_ID: z.string().endsWith(".apps.googleusercontent.com", {
      error: "Invalid GOOGLE_CLIENT_ID",
    }),

    GOOGLE_CLIENT_SECRET: z
      .string()
      .min(1, { error: "GOOGLE_CLIENT_SECRET is required" }),

    FACEBOOK_CLIENT_ID: z
      .string()
      .min(1, { error: "FACEBOOK_CLIENT_ID is required" }),

    FACEBOOK_CLIENT_SECRET: z
      .string()
      .min(1, { error: "FACEBOOK_CLIENT_SECRET is required" }),
  },
  experimental__runtimeEnv: process.env,
});

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "./database/dbClient";
import { serverEnv } from "./env/serverEnv";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite", // or "mysql", "postgresql", ...etc
  }),

  plugins: [nextCookies()],

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  socialProviders: {
    google: {
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
    },

    facebook: {
      clientId: serverEnv.FACEBOOK_CLIENT_ID,
      clientSecret: serverEnv.FACEBOOK_CLIENT_SECRET,
    },
  },
});

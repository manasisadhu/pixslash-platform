import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { clientEnv } from "./env/clientEnv";

export const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL,
});

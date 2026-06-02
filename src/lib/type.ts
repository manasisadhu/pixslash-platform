import { ReactNode } from "react";
import z from "zod";
import { loginSchema, registerSchema } from "./zodSchema";

export type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export type LoginSchemaType = z.infer<typeof loginSchema>;

import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import z from "zod";
import { loginSchema, registerSchema } from "./zodSchema";

export type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export type LayoutChildrenProps = {
  children: ReactNode;
};

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export type LoginSchemaType = z.infer<typeof loginSchema>;

export type SideBarNavItemType = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export type AppSidebarProps = {
  userId: string;
};

export type UserAvatarProps = {
  name: string | undefined;
  image: string | null | undefined;
};

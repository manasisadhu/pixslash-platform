import { Prisma } from "@generated/prisma/client";
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
  size?: "lg" | "sm" | "default";
};

export type WallpaperCardUserProps = Prisma.WallpaperGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
        image: true;
      };
    };
    _count: {
      select: {
        likes: true;
      };
    };
  };
}>;

export type WallpaperDetailsCardType = Prisma.WallpaperGetPayload<{
  omit: {
    thumbnailUrl: true;
    updatedAt: true;
    categoryId: true;
    id: true;
  };

  include: {
    category: {
      select: {
        categoryName: true;
      };
    };

    user: {
      select: {
        name: true;
        image: true;
      };
    };

    wallpaperTags: {
      select: {
        tag: {
          select: {
            title: true;
            slug: true;
            id: true;
          };
        };
      };
    };

    comments: {
      orderBy: {
        createdAt: "desc";
      };

      select: {
        id: true;
        opinion: true;
        createdAt: true;

        user: {
          select: {
            name: true;
            image: true;
          };
        };
      };
    };

    _count: {
      select: {
        likes: true;
        comments: true;
      };
    };
  };
}>;

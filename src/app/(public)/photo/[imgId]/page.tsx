import { buttonVariants } from "@/components/shadcnui/button";
import WallpaperDetailsCard from "@/components/Wallpaper/WallpaperDetailsCard";
import prisma from "@/lib/database/dbClient";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    imgId: string;
  }>;
};

const getWallPaper = async (imgId: string) => {
  return await prisma.wallpaper.findUnique({
    where: {
      slug: imgId,
      isPublic: true,
    },

    omit: {
      thumbnailUrl: true,
      updatedAt: true,
      categoryId: true,
      id: true,
    },

    include: {
      category: {
        select: {
          categoryName: true,
        },
      },

      wallpaperTags: {
        select: {
          tag: {
            select: {
              title: true,
              slug: true,
              id: true,
            },
          },
        },
      },

      user: {
        select: {
          name: true,
          image: true,
        },
      },

      comments: {
        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,
          opinion: true,
          createdAt: true,

          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },

      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { imgId } = await params;

  const wallpaper = await prisma.wallpaper.findUnique({
    where: {
      slug: imgId,
      isPublic: true,
    },
    select: {
      title: true,
      description: true,
      imageUrl: true,
    },
  });

  if (!wallpaper) {
    return {
      title: "Wallpaper Not Found",
    };
  }

  return {
    title: `${wallpaper.title} | Pixslash`,
    description:
      wallpaper.description ??
      `Download ${wallpaper.title} wallpaper in HD, QHD and 4K quality.`,

    openGraph: {
      title: wallpaper.title,
      description:
        wallpaper.description ??
        `Download ${wallpaper.title} wallpaper in HD, QHD and 4K quality.`,
      images: [
        {
          url: wallpaper.imageUrl,
          width: 1200,
          height: 630,
          alt: wallpaper.title,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: wallpaper.title,
      description:
        wallpaper.description ??
        `Download ${wallpaper.title} wallpaper in HD, QHD and 4K quality.`,
      images: [wallpaper.imageUrl],
    },
  };
};

const page = async ({ params }: PageProps) => {
  const { imgId } = await params;
  const wallpaper = await getWallPaper(imgId);

  if (!wallpaper) {
    notFound();
  }

  return (
    <section className="gap-2 md:flex">
      <Link
        href={"/"}
        className={buttonVariants({ variant: "ghost" })}>
        <XIcon />
      </Link>
      <div className="w-full">
        <WallpaperDetailsCard getDetails={wallpaper} />
      </div>
    </section>
  );
};

export default page;

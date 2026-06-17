import WallpaperPageContent from "@/components/Wallpaper/WallpaperPageContent";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stunning Free Wallpapers & Images | Pixslash",
  description:
    "The best free stock photos, royalty free images & Wallpapers shared by creators. Discover, collect stunning wallpapers. Pixslash is your destination for high-quality wallpapers.",
};

const page = async () => {
  const getImages = await prisma.wallpaper.findMany({
    where: {
      isPublic: true,
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  if (getImages.length === 0) {
    return <div>No wallpapers found</div>;
  }

  return <WallpaperPageContent info={getImages} />;
};

export default page;

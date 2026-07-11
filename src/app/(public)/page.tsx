import MasonryWallpaperGrid from "@/components/Wallpaper/Grid/MaonaryWallpaperGrid";
import getAllWallpaper from "@/server/wallpaper/getAllWallpaper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stunning Free Wallpapers & Images | Pixslash",
  description:
    "The best free stock photos, royalty free images & Wallpapers shared by creators. Discover, collect stunning wallpapers. Pixslash is your destination for high-quality wallpapers.",
};

const page = async () => {
  const getAllWallpapers = await getAllWallpaper();

  if (getAllWallpapers.length === 0) {
    return (
      <div className="grid h-dvh place-items-center">No wallpapers found</div>
    );
  }

  return (
    <>
      {getAllWallpapers.length === 1 ?
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <MasonryWallpaperGrid wallpapers={getAllWallpapers} />
        </section>
      : <MasonryWallpaperGrid wallpapers={getAllWallpapers} />}
    </>
  );
};

export default page;

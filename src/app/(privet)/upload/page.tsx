import UploadWallpaper from "@/components/Dashboard/UploadWallpaper";
import prisma from "@/lib/database/dbClient";

const page = async () => {
  const getCategories = await prisma.category.findMany();
  const getTags = await prisma.tag.findMany();

  return (
    <section className="grid h-auto px-4 py-4 md:place-items-center md:px-0 md:py-0 lg:h-[80dvh]">
      <UploadWallpaper
        categoryInfo={getCategories}
        tagInfo={getTags}
      />
    </section>
  );
};

export default page;

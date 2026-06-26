import SavedWallpaperCard from "@/components/Wallpaper/SavedWallpaperCard";
import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

const page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    notFound();
  }

  const getSavePost = await prisma.savedPost.findMany({
    where: {
      userId: session?.user.id,
    },

    orderBy: [
      {
        createdAt: "desc",
      },
      {
        id: "desc",
      },
    ],

    select: {
      createdAt: true,

      wallpaper: {
        select: {
          id: true,
          imageUrl: true,
          height: true,
          width: true,
          title: true,
          description: true,
          slug: true,

          user: {
            select: {
              id: true,
              image: true,
              name: true,
            },
          },
        },
      },
    },
  });

  const isSaved = true;

  return (
    <section className="shm grid grid-cols-1 gap-4 px-6 pt-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-2">
      {getSavePost.map((post) => (
        <SavedWallpaperCard
          key={post.wallpaper.id}
          savePostInfo={post}
          initialSaved={isSaved}
        />
      ))}
    </section>
  );
};

export default page;

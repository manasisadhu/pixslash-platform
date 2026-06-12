import prisma from "@/lib/database/dbClient";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    userId: string;
  }>;
};

const Page = async ({ params }: PageProps) => {
  const { userId } = await params;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <section className="grid h-dvh place-items-center">
      <div>
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p>{user.email}</p>
      </div>
    </section>
  );
};

export default Page;

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | PixSlash",
  description:
    "Login in to your PixSlash account to explore, upload, organize, and download high-quality wallpapers for desktop and mobile devices.",
};

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <h1 className="text-5xl font-semibold">Login page</h1>
    </section>
  );
};

export default page;

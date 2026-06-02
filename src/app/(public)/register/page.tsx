import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | PixSlash",
  description:
    "Register in to your PixSlash account to explore, upload, organize, and download high-quality wallpapers for desktop and mobile devices.",
};

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <h1 className="text-5xl font-semibold">Register page</h1>
    </section>
  );
};

export default page;

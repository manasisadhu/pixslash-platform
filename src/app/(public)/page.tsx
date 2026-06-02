import ToastButton from "@/components/Buttons/ToastButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stunning Free Wallpapers & Images | Pixslash",
  description:
    "The best free stock photos, royalty free images & Wallpapers shared by creators. Discover, collect stunning wallpapers. Pixslash is your destination for high-quality wallpapers.",
};

const page = () => {
  return (
    <section className="grid h-[90dvh] place-items-center">
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-semibold">
          Pixslash Wallpaper Application
        </h1>

        <h2 className="text-3xl">All Wallpapers Show In this Page</h2>

        <ToastButton />
      </div>
    </section>
  );
};

export default page;

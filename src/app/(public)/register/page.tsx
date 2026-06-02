import RegisterForm from "@/components/Auth/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | PixSlash",
  description:
    "Register in to your PixSlash account to explore, upload, organize, and download high-quality wallpapers for desktop and mobile devices.",
};

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-auto md:w-100">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            Create an account
          </CardTitle>
          <CardDescription className="text-sm md:text-lg">
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default page;

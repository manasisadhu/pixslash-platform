import RegisterForm from "@/components/Auth/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register | PixSlash",
  description:
    "Register in to your PixSlash account to explore, upload, organize, and download high-quality wallpapers for desktop and mobile devices.",
};

const page = () => {
  return (
    <section className="grid h-[91dvh] place-items-center">
      <Card className="w-auto md:w-100">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            Create an account
          </CardTitle>

          <CardDescription className="text-[16px]">
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm />
        </CardContent>

        <CardFooter>
          {/* additonal link  */}
          <CardDescription className="mx-auto">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline decoration-1">
              Login
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </section>
  );
};

export default page;

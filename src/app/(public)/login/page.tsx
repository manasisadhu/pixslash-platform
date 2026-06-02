import LoginForm from "@/components/Auth/LoginForm";
import OAuthButton from "@/components/Buttons/OAuthButton";
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
  title: "Login | PixSlash",
  description:
    "Login in to your PixSlash account to explore, upload, organize, and download high-quality wallpapers for desktop and mobile devices.",
};

const page = () => {
  return (
    <section className="grid h-[90dvh] place-items-center">
      <Card className="w-auto md:w-100">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Welcome back</CardTitle>

          <CardDescription className="text-[16px]">
            Login to your PixSlash account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />

          {/* social login buttons  */}
          <section className="grid grid-cols-2 gap-4 py-3">
            <OAuthButton
              label="Google"
              socialProviders="google"
            />
            <OAuthButton
              label="Facebook"
              socialProviders="facebook"
            />
          </section>
        </CardContent>

        <CardFooter>
          {/* additonal link  */}
          <CardDescription className="mx-auto">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="underline decoration-1">
              Register
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </section>
  );
};

export default page;

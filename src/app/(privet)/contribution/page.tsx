import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const page = async () => {
  const userInfo = await auth.api.getSession({
    headers: await headers(),
  });

  const userName = userInfo?.user.name;

  return (
    <section className="grid h-dvh place-items-center">
      {userName} Uploads
    </section>
  );
};

export default page;

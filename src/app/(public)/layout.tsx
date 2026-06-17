import AppSidebar from "@/components/Dashboard/AppSidebar";
import Header from "@/components/Header/Header";
import PrivateHeader from "@/components/Header/PrivateHeader";
import { SidebarInset, SidebarProvider } from "@/components/shadcnui/sidebar";
import { auth } from "@/lib/auth";
import { LayoutChildrenProps } from "@/lib/type";
import { headers } from "next/headers";

const PublicLayout = async ({ children }: LayoutChildrenProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.session.id) {
    return (
      <SidebarProvider>
        <AppSidebar userId={session.user.id} />
        <SidebarInset>
          <PrivateHeader />
          <main className="px-6 py-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-4">{children}</main>
    </>
  );
};

export default PublicLayout;

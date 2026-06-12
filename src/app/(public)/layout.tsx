import AppSidebar from "@/components/Dashboard/AppSidebar";
import Header from "@/components/Header/Header";
import PrivateHeader from "@/components/Header/PrivateHeader";
import { SidebarInset, SidebarProvider } from "@/components/shadcnui/sidebar";
import { LayoutChildrenProps } from "@/lib/type";
import authenticUser from "@/server/authenticUser";

const PublicLayout = async ({ children }: LayoutChildrenProps) => {
  const { data } = await authenticUser();

  if (data?.session.id) {
    return (
      <SidebarProvider>
        <AppSidebar userId={data.user.id} />
        <SidebarInset>
          <PrivateHeader />
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl">{children}</main>
    </>
  );
};

export default PublicLayout;

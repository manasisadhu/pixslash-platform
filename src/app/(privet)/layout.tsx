import AppSidebar from "@/components/Dashboard/AppSidebar";
import PrivateHeader from "@/components/Header/PrivateHeader";
import { SidebarInset, SidebarProvider } from "@/components/shadcnui/sidebar";
import { LayoutChildrenProps } from "@/lib/type";
import authenticUser from "@/server/authenticUser";
import { redirect } from "next/navigation";

const PrivetLayout = async ({ children }: LayoutChildrenProps) => {
  const { data } = await authenticUser();

  if (!data) {
    redirect("/login");
  }
  return (
    <SidebarProvider>
      <AppSidebar userId={data.user.id} />
      <SidebarInset>
        <PrivateHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PrivetLayout;

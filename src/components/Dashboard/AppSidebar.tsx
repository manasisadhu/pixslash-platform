"use client";

import { AppSidebarProps, SideBarNavItemType } from "@/lib/type";
import {
  BookmarkIcon,
  ImagesIcon,
  LayoutDashboardIcon,
  PlusIcon,
  UserIcon,
  WallpaperIcon,
} from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarRail,
} from "../shadcnui/sidebar";

const sideBarNavItem: SideBarNavItemType[] = [
  {
    href: "/overview" as const,
    label: "overview",
    icon: LayoutDashboardIcon,
  },

  {
    href: "/" as const,
    label: "Wallpapers",
    icon: WallpaperIcon,
  },

  {
    href: "/contribution" as const,
    label: "My Wallpapers",
    icon: ImagesIcon,
  },

  {
    href: "/upload" as const,
    label: "Upload",
    icon: PlusIcon,
  },

  {
    href: "/saved" as const,
    label: "Saved Wallpapers",
    icon: BookmarkIcon,
  },
];

const AppSidebar = ({ userId }: AppSidebarProps) => {
  const path = usePathname();
  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className="">
      <SidebarHeader>
        <SidebarMenu className="pt-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href={"/" as Route} />}>
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-xl">
                P
              </div>
              <span className="text-xl font-semibold">Pixslash</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {sideBarNavItem.map((item) => {
                const isActive = path === item.href;

                return (
                  <SidebarMenuSubItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href as Route} />}
                      tooltip={item.label}
                      isActive={isActive}>
                      <item.icon />
                      {item.label}
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                );
              })}

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href={`/profile/${userId}`} />}
                  tooltip={"Profile"}
                  isActive={path === `/profile/${userId}`}>
                  <UserIcon />
                  Profile
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;

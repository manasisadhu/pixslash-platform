"use client";
import { authClient } from "@/lib/auth-client";
import { ChevronDownIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoutButton from "../Buttons/LogoutButton";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";
import UserAvatar from "../Dashboard/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcnui/dropdown-menu";
import { Separator } from "../shadcnui/separator";
import { SidebarTrigger } from "../shadcnui/sidebar";
import { Skeleton } from "../shadcnui/skeleton";

const PrivateHeader = () => {
  const { push } = useRouter();
  const { data, isPending } = authClient.useSession();
  return (
    <header
      className="sticky top-0 z-50 border-b"
      aria-label="app-header">
      <div className="flex items-center justify-between px-6 py-3">
        <nav className="flex items-center gap-2">
          <SidebarTrigger className="max-md:text-foreground" />
          <Separator orientation="vertical" />
          <Link href={"/"}>
            <h1
              className="text-2xl font-semibold"
              aria-label="App Name">
              PixSlash
            </h1>
          </Link>
        </nav>

        <nav className="flex items-center gap-4">
          {isPending ?
            <Skeleton className="h-8 w-8 rounded-full" />
          : <>
              <DropdownMenu>
                <DropdownMenuTrigger className="ring-border hover:ring-foreground/30 flex cursor-pointer items-center gap-1 rounded-full p-0.5 pr-2 ring-1 transition-all">
                  <UserAvatar
                    name={data?.user.name}
                    image={data?.user.image}
                  />
                  <ChevronDownIcon className="text-muted-foreground h-4 w-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {data?.user.name}
                        </span>

                        <span className="text-muted-foreground text-xs">
                          {data?.user.email}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => push(`/profile/${data?.user.id}`)}>
                      <UserIcon /> Profile
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <LogoutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          }

          <Separator orientation="vertical" />

          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
};

export default PrivateHeader;

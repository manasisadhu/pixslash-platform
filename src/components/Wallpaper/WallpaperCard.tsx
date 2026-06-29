"use client";

import { Award, Bookmark, Download, HeartIcon } from "lucide-react";
import Image from "next/image";

import { WallpaperCardUserProps } from "@/lib/type";
import { Route } from "next";
import Link from "next/link";
import UserAvatar from "../Dashboard/UserAvatar";
import { Button } from "../shadcnui/button";
import { Card, CardContent } from "../shadcnui/card";

type WallpaperCardProps = {
  info: WallpaperCardUserProps;
};

const WallpaperCard = ({ info }: WallpaperCardProps) => {
  return (
    <Card className="group overflow-hidden rounded-xl border-0 p-0 shadow-sm transition-all duration-300 hover:cursor-pointer hover:shadow-xl">
      {/* Wallpaper Image */}
      <CardContent className="relative p-0">
        <Link href={`/photo/${info.slug}` as Route}>
          <Image
            src={
              info.imageUrl.startsWith("https") ?
                info.imageUrl
              : `/wallpapers/${info.imageUrl}`
            }
            alt={`image - ${info.title}`}
            width={info.width ?? 1200}
            height={info.height ?? 800}
            loading="lazy"
            className="relative z-10 h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Hover Overlay */}

        {/* Top Left - Editor Choice */}
        <div className="absolute top-3 left-3 z-20 -translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="bg-background/90 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md">
            <Award className="h-3.5 w-3.5" />
            Editor&apos;s Choice
          </div>
        </div>

        {/* Top Right - Actions */}
        <div className="absolute top-3 right-3 z-20 flex -translate-y-2 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            aria-label="Save wallpaper"
            className="bg-background/90 h-9 w-9 rounded-full backdrop-blur-md">
            <Bookmark className="h-4 w-4" />
          </Button>

          <Button
            variant="secondary"
            aria-label="Like Wallpaper"
            className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 text-white backdrop-blur-xl hover:bg-black/70">
            <HeartIcon className="h-4 w-4 fill-current" />
            <span className="text-sm font-semibold">
              {info._count.likes.toLocaleString()}
            </span>
          </Button>

          <Button
            size="icon"
            variant="secondary"
            aria-label="Download wallpaper"
            className="bg-background/90 h-9 w-9 rounded-full backdrop-blur-md">
            <Download className="h-4 w-4" />
          </Button>
        </div>

        {/* Bottom Section */}
        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center justify-between p-4">
            {/* User */}
            <div className="flex items-center gap-2 py-2">
              <UserAvatar
                name={info.user?.name}
                image={info.user?.image}
                size="default"
              />

              <span className="text-sm font-medium text-white">
                {info.user?.name || "Anonymous"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WallpaperCard;

"use client";

import { Award, Bookmark, Download, HeartIcon } from "lucide-react";

import { WallpaperCardUserProps } from "@/lib/type";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import UserAvatar from "../Dashboard/UserAvatar";
import { Button } from "../shadcnui/button";
import { Card, CardContent } from "../shadcnui/card";

type WallpaperCardProps = {
  info: WallpaperCardUserProps;
};

export const WallpaperCard = ({ info }: WallpaperCardProps) => {
  const aspectRatioClass = getAspectRatioClass(info.width, info.height);
  console.log({
    title: info.title,
    width: info.width,
    height: info.height,
    aspectRatioClass,
  });

  return (
    <Card
      className={
        "group w-full overflow-hidden rounded-xl border-0 p-0 shadow-sm transition-all duration-300 hover:cursor-pointer hover:shadow-xl"
      }>
      {/* Wallpaper Image */}
      <CardContent
        className={`relative overflow-hidden px-0 py-0 ${aspectRatioClass}`}>
        <Link href={`/photo/${info.slug}` as Route}>
          <Image
            src={`/wallpapers/${info.imageUrl}`}
            fill
            alt={`image - ${info.title}`}
            loading="lazy"
            className="h-auto w-full overflow-hidden object-cover"
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

function getAspectRatioClass(
  width: number | null,
  height: number | null,
): string {
  if (!width || !height) return "aspect-[4/3]";

  const ratio = width / height;

  if (ratio >= 2.1) return "aspect-[21/9]";
  if (ratio >= 1.7) return "aspect-video";
  if (ratio >= 1.25) return "aspect-[4/3]";
  if (ratio >= 0.95) return "aspect-square";
  if (ratio >= 0.7) return "aspect-[3/4]";

  return "aspect-[9/16]";
}

import { SavedWallpaperCardType } from "@/lib/type";
import { formatDistanceToNowStrict } from "date-fns";
import { DownloadIcon } from "lucide-react";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import SaveButton from "../Buttons/SaveButton";
import UserAvatar from "../Dashboard/UserAvatar";
import { Button } from "../shadcnui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../shadcnui/card";

type SavedWallpaperCardProps = {
  savePostInfo: SavedWallpaperCardType;
  initialSaved: boolean;
};

const SavedWallpaperCard = async ({
  savePostInfo,
  initialSaved,
}: SavedWallpaperCardProps) => {
  return (
    <Card className="overflow-hidden p-0 shadow dark:shadow-none">
      <CardHeader className={`group relative aspect-4/3 overflow-hidden p-0`}>
        <Link
          href={`/photo/${savePostInfo.wallpaper.slug}` as Route}
          className="absolute inset-0">
          <Image
            src={
              `/wallpapers/posts/${savePostInfo.wallpaper.imageUrl}` ||
              `/wallpapers/thumbnail/${savePostInfo.wallpaper.thumbnailUrl}`
            }
            alt={savePostInfo.wallpaper.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="h-full w-full object-cover"
          />
        </Link>

        {/* Hover Overlay */}
        {/* Top Left - Editor Choice */}
        <div className="absolute top-3 left-3 z-20 flex -translate-y-2 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <UserAvatar
            image={savePostInfo.wallpaper.user?.image}
            name={savePostInfo.wallpaper.user?.name}
          />

          <CardTitle className="text-sm text-white">
            {savePostInfo.wallpaper.user?.name}
          </CardTitle>
        </div>

        <div className="absolute top-3 right-3 z-20 flex -translate-y-2 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {/* save system  */}
          <SaveButton
            buttonVariant="secondary"
            wallpaperId={savePostInfo.wallpaper.id}
            initialSaved={initialSaved}></SaveButton>

          <Button
            size="icon"
            variant="secondary"
            aria-label="Download wallpaper"
            className="bg-background/90 h-9 w-9 rounded-full backdrop-blur-md">
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="w-full pb-4">
        {/*  text  content */}
        <div>
          <CardTitle className="flex items-end gap-2">
            {savePostInfo.wallpaper.title}

            <CardDescription className="text-[12px]">
              {formatDistanceToNowStrict(savePostInfo.createdAt, {
                addSuffix: true,
              })}
            </CardDescription>
          </CardTitle>
          <CardDescription>
            {savePostInfo.wallpaper.description}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedWallpaperCard;

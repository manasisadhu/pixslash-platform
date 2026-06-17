"use client";

import { WallpaperCardUserProps } from "@/lib/type";
import Masonry from "react-masonry-css";
import WallpaperCard from "./WallpaperCard";
const breakpointCols = {
  default: 4,
  1024: 4,
  768: 2,
  640: 1,
};

type WallpaperPageContentProps = {
  info: WallpaperCardUserProps[];
};

const WallpaperPageContent = ({ info }: WallpaperPageContentProps) => {
  return (
    <Masonry
      breakpointCols={breakpointCols}
      className="masonry-grid"
      columnClassName="masonry-grid-column">
      {info.map((i) => {
        return (
          <WallpaperCard
            key={i.id}
            info={i}
          />
        );
      })}
    </Masonry>
  );
};

export default WallpaperPageContent;

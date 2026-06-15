"use client";

import { LayoutChildrenProps } from "@/lib/type";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const MasonryGridProvider = ({ children }: LayoutChildrenProps) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        350: 1,
        750: 2,
        900: 3,
        1200: 4,
      }}>
      <Masonry gutter="16px">{children}</Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryGridProvider;

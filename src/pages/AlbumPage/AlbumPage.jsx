import React from "react";
import AlbumBanner from "./components/AlbumBanner";

const AlbumPage = () => {
  return (
    <div>
      <div>
        <div
          배경색상
          className="w-full absolute  bg-cover self-stretch h-[100%] bg-slate-50"
          //   style={{
          //     backgroundImage: `url(
          // "https://i.namu.wiki/i/3B-OpZ4Zv3EHLm1L1u0vOWjT2Sy4uAT43W93T0QzZW-YhxaP8ECybTqzArW3u6xA86NG-GOWWPPnNyUgPMzllQ.webp")`,
          //     filter: "blur(20px)",
          //   }}
        ></div>
        <AlbumBanner />
      </div>
    </div>
  );
};

export default AlbumPage;

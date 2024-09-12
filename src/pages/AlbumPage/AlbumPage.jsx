import React from "react";
import AlbumBanner from "./components/AlbumBanner";
import Card from "../../common/Card";

const AlbumPage = () => {
  return (
    <div>
      <div>
        <div
          className="w-full absolute  bg-cover self-stretch h-[100%]  rounded-md bg-[#283423]" //배경색상은 동적으로 변경할 예정.
          // style={{
          //   backgroundImage: `url(
          // "https://i.namu.wiki/i/3B-OpZ4Zv3EHLm1L1u0vOWjT2Sy4uAT43W93T0QzZW-YhxaP8ECybTqzArW3u6xA86NG-GOWWPPnNyUgPMzllQ.webp")`,
          //   filter: "blur(20px)",
          // }}
        ></div>
        <AlbumBanner />
        <Card title="정국" subTitle="아티스트" />
      </div>
    </div>
  );
};

export default AlbumPage;

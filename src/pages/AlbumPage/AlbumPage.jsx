import React from "react";
import AlbumBanner from "./components/AlbumBanner";
import Card from "../../common/Card";
import { Link } from "react-router-dom";
import ControllerBar from "./components/ControllerBar";
import TrackList from "./components/TrackList";

const AlbumPage = () => {
  return (
    <div
      className={`w-[100%]  bg-cover self-stretch h-[100%]   rounded-md bg-[#283423] bg-gradient-to-b from-transparent to-black`} //배경색상은 동적으로 변경할 예정.
      // style={{
      //   backgroundImage: `url(
      // "https://i.namu.wiki/i/3B-OpZ4Zv3EHLm1L1u0vOWjT2Sy4uAT43W93T0QzZW-YhxaP8ECybTqzArW3u6xA86NG-GOWWPPnNyUgPMzllQ.webp")`,
      //   filter: "blur(20px)",
      // }}
    >
      {/* 앨범 배너 */}
      <div>
        <AlbumBanner />
      </div>
      {/* 트랙리스트 섹션 */}
      <div className="p-4">
        <ControllerBar />
        <TrackList />
      </div>
      {/* 더보기 */}
      <div>
        <div className="flex justify-between items-center text-white p-4">
          <Link
            to={"/search"}
            className="text-2xl font-bold cursor-pointer hover:underline"
          >
            xx님의 곡 더보기
          </Link>
          <div className="cursor-pointer hover:underline text-[#b3b3b3] font-medium pr-3">
            디스코 그래피보기
          </div>
        </div>
        <div className="flex justify-around">
          <Card title="정국" subTitle="아티스트" />
          <Card title="정국" subTitle="아티스트" />
          <Card title="정국" subTitle="아티스트" />
          <Card title="정국" subTitle="아티스트" />
          <Card title="정국" subTitle="아티스트" />
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;

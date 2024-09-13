import React from "react";
import AlbumBanner from "./components/AlbumBanner";
import Card from "../../common/Card";
import { Link } from "react-router-dom";
import ControllerBar from "./components/ControllerBar";
import TrackList from "./components/TrackList";
import { useState } from "react";
import AlbumPageFooter from "./AlbumPageFooter";

const AlbumPage = () => {
  const [viewOption, setViewOption] = useState("small"); // 보기를 small or list로 설정
  const viewOptionBox = {
    viewOption: viewOption,
    setViewOption: setViewOption,
  };
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
      <div className="p-4 ">
        <ControllerBar viewOptionBox={viewOptionBox} />
        <TrackList viewOptionBox={viewOptionBox} />
      </div>
      <div className="text-[#b3b3b3] flex flex-col mt-9 p-4">
        <span className="text-[14px]">September 2024</span>
        <span className="text-[11px]">
          ℗ 2024 React Study Group 2nd Generation, Team 3
        </span>
        <span className="text-[11px]">
          ℗ 2024 React Study Group 2nd Generation, Team 3
        </span>
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
          <div className="cursor-pointer hover:underline text-[#b3b3b3] font-medium pr-2">
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
      {/* <AlbumPageFooter /> */}
    </div>
  );
};

export default AlbumPage;

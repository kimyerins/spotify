import React from "react";
import AlbumBanner from "./components/AlbumBanner";
import Card from "../../common/Card";
import { Link, useParams } from "react-router-dom";
import ControllerBar from "./components/ControllerBar";
import TrackList from "./components/TrackList";
import { useState } from "react";
import AlbumPageFooter from "./AlbumPageFooter";
import { useSpotifyAlbum } from "../../hooks/useSpotifyAlbum";
import { useAlbumInfo } from "../../hooks/useAlbumInfo";
import { useAlbumsOfArtists } from "../../hooks/useAlbumsOfArtists";
import { useNavigate } from "react-router-dom";
import { useAlbumTracks } from "../../hooks/useAlbumTracks";

const AlbumPage = () => {
  const { id } = useParams();
  console.log("전달받은 params", id);
  const navigate = useNavigate();
  const [viewOption, setViewOption] = useState("small"); // 보기를 small or list로 설정
  const viewOptionBox = {
    viewOption: viewOption,
    setViewOption: setViewOption,
  };
  // let testAlbumId = "6XRGc3GNodkhSrPwHnx1KX"; //뉴진스의 앨범ID
  let testAlbumId = "41MozSoPIsD1dJM0CLPjZF"; //블랙핑크의 앨범ID
  // const token = localStorage.getItem("spotifyToken");

  const { data: albumData, isLoading, isError, error } = useAlbumInfo(id); // 앨범 id로 데이터 가져오기
  console.log("앨범데이터 : ", albumData);

  // const { data: artiData } = useAlbumsOfArtists("6HvZYsbFfjnjFrWF950C9d"); // 아티스트 id로 앨범데이터 가져오기
  // console.log("앨범데이터by아티스트 : ", artiData);

  // const { data: tracks, isLoading, isError, error } = useAlbumTracks(id); // 앨범 id로 트랙리스트 가져오기
  // console.log("트랙리스트 : ", tracks);
  let arr = ["search"];

  return (
    <div
      className={`w-[100%] bg-cover self-stretch h-auto   rounded-md bg-[#283423] bg-gradient-to-b from-transparent to-[#121212]`} //배경색상은 동적으로 변경할 예정.
      // style={{
      //   backgroundImage: `url(
      // "https://i.namu.wiki/i/3B-OpZ4Zv3EHLm1L1u0vOWjT2Sy4uAT43W93T0QzZW-YhxaP8ECybTqzArW3u6xA86NG-GOWWPPnNyUgPMzllQ.webp")`,
      //   filter: "blur(20px)",
      // }}
    >
      {/* 앨범 배너 */}
      <div>
        {/* <AlbumBanner albumData={albumData} /> */}
        <AlbumBanner />
      </div>
      {/* 트랙리스트 섹션 */}
      <div className="p-4 ">
        <ControllerBar viewOptionBox={viewOptionBox} />
        <TrackList viewOptionBox={viewOptionBox} albumData={albumData} />
        {/* <TrackList viewOptionBox={viewOptionBox} albumData={albumData} /> */}
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
            {/* {albumData?.name}님의 곡 더보기 */}
          </Link>
          <div className="cursor-pointer hover:underline text-[#b3b3b3] font-medium pr-2">
            디스코 그래피보기
          </div>
        </div>
        <div className="flex mb-[60px]">
          {arr?.map((data) => {
            return <Card title="테스트" subTitle="아티스트" url={data} />;
          })}

          <Card
            title="정국"
            subTitle="아티스트"
            subTitleUrl={"detail/Album/1FVw30SoC91lq1UZ6N9rwN"}
          />
          <Card
            title="정국"
            subTitle="아티스트"
            subTitleUrl={"detail/Album/1FVw30SoC91lq1UZ6N9rwN"}
          />
          <Card
            title="정국"
            subTitle="아티스트"
            subTitleUrl={"detail/Album/1FVw30SoC91lq1UZ6N9rwN"}
          />
        </div>
      </div>
      {/* <AlbumPageFooter /> */}
    </div>
  );
};

export default AlbumPage;

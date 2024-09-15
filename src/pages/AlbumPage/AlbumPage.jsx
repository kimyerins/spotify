import React from "react";
import AlbumBanner from "./components/AlbumBanner";
import Card from "../../common/Card";
import { Link, useParams } from "react-router-dom";
import ControllerBar from "./components/ControllerBar";
import TrackList from "./components/TrackList";
import { useState } from "react";
import { useAlbumInfo } from "../../hooks/useAlbumInfo";
import { useAlbumsOfArtists } from "../../hooks/useAlbumsOfArtists";
import { useArtistById } from "../../hooks/useArtistById";

const AlbumPage = () => {
  const { id } = useParams();
  console.log("전달받은 params", id);
  const [viewOption, setViewOption] = useState("small"); // 보기를 small or list로 설정
  const viewOptionBox = {
    viewOption: viewOption,
    setViewOption: setViewOption,
  };
  // let testAlbumId = "6XRGc3GNodkhSrPwHnx1KX"; //뉴진스의 앨범ID

  const { data: albumData, isLoading: isLoadingAlbum } = useAlbumInfo(id);
  let artistId = albumData?.artists[0]?.id; //아티스트 id
  const { data: albumDataByArtistId } = useAlbumsOfArtists(artistId); // 아티스트 id로 앨범데이터 가져오기
  const { data: artistData, isLoading: isLoadingArtist } =
    useArtistById(artistId); //아티스트정보 가져오기

  console.log("앨범데이터 : ", albumData);
  console.log("앨범데이터by아티스트 : ", albumDataByArtistId);
  console.log("아티스트데이터", artistData);
  // 데이터 로드 상태에 따른 렌더링 처리
  if (isLoadingAlbum || isLoadingArtist) {
    return <div>Loading...</div>;
  }
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
        <AlbumBanner albumData={albumData} artistData={artistData} />
        {/* <AlbumBanner /> */}
      </div>
      {/* 트랙리스트 섹션 */}
      <div className="p-4 ">
        <ControllerBar viewOptionBox={viewOptionBox} id={id} />
        <TrackList viewOptionBox={viewOptionBox} albumData={albumData} />
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
            {albumData?.artists[0]?.name}님의 곡 더보기
          </Link>
          <div className="cursor-pointer hover:underline text-[#b3b3b3] font-medium pr-2">
            디스코 그래피보기
          </div>
        </div>
        <div className="flex mb-[60px] justify-between">
          {albumDataByArtistId?.items?.slice(0, 4).map((data, index) => {
            return (
              <Card
                title={data.name}
                subTitle={data.artists[0].name}
                imgUrl={data.images[0].url}
                url={`detail/Album/${data.id}`}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;

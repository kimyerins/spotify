import React, { useState } from "react";
import RoundInfoCard from "../../common/InfoCard/RoundInfoCard";
import SquareInfoCard from "../../common/InfoCard/SquareInfoCard";
import TrackListCard from "../../common/InfoCard/TrackListCard";
import { useParams } from "react-router-dom";
import { useSearchArtists } from "../../hooks/useSearchArtists";

const ArtistInfoPage = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { name } = useParams();
  const { data, isLoading, isError } = useSearchArtists(name);

  let info = null;

  // 데이터가 존재하고 첫 번째 항목이 있을 때 info에 할당
  if (data && data.length > 0) {
    info = data[0];
  }

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const toggleTrackList = () => {
    setIsExpanded(!isExpanded);
  };

  const trackListCount = isExpanded ? 10 : 5;

  // 로딩 중이거나 데이터가 없을 때
  if (isLoading || !info) {
    return <p>Loading...</p>;
  }

  return (
    <div className={"w-[100%] ArtistInfoPage overflow-hidden rounded-[10px] bg-[#121212] mr-2"} style={{ color: "white" }}>
      <div className={"w-[100%] topbar"}></div>

      <div className={"w-[100%] h-calc-100vh-minus-5rem relative"}>
        {/* 배너 */}
        <div
          className={"relative w-[100%] h-80 bg-cover bg-top"}
          style={{
            backgroundImage: `url(${info.images[0].url})`,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end p-8 bg-gradient-to-b from-transparent to-[#121212]">
            <div className={"flex items-center gap-2.5"}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#4cb3ff" xmlns="http://www.w3.org/2000/svg">
                <rect x="20%" y="20%" width="60%" height="60%" fill="white" />
                <path d="M10.814.5a1.658 1.658 0 0 1 2.372 0l2.512 2.572 3.595-.043a1.658 1.658 0 0 1 1.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 0 1-1.678 1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 0 1-2.372 0l-2.512-2.572-3.595.043a1.658 1.658 0 0 1-1.678-1.678l.043-3.595L.5 13.186a1.658 1.658 0 0 1 0-2.372l2.572-2.512-.043-3.595a1.658 1.658 0 0 1 1.678-1.678l3.595.043L10.814.5zm6.584 9.12a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308 7.425-7.425z" />
              </svg>
              <p className="text-sm">확인된 아티스트</p>
            </div>
            <h2 className={"text-8xl font-extrabold"}>{info.name}</h2>
            <div className="pt-6">
              월별 리스너 <span className="font-semibold">{info.followers.total.toLocaleString()}</span>명
            </div>
          </div>
        </div>

        {/* 콘텐츠 */}
        <div className={"w-[100%] info-container relative overflow-x-clip min-h-[calc(100vh - 5rem)]"}>
          {/* 재생 버튼 바 */}
          <div className={"p-4 flex items-center gap-4 bg-[#121212]"}>
            <div>
              <span className="bg-[#1ed760] w-14 h-14 flex items-center justify-center rounded-full hover:bg-[#3be477] cursor-pointer">
                <svg role="img" aria-hidden="true" viewBox="0 0 24 24" className="w-6 h-6 text-[#000000]" fill="currentColor">
                  <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                </svg>
              </span>
            </div>
            <button className={"px-4 py-1.5 rounded-full text-sm font-bold border border-solid border-[#656565] hover:border-white"}>
              팔로우하기
            </button>
          </div>

          {/* 인기 노래 리스트 */}
          <div className={"p-4 bg-[#121212]"}>
            <h3 className={"text-2xl font-bold"}>인기</h3>
            <div className={"p-4"}>
              {[...Array(trackListCount)].map((_, index) => (
                <TrackListCard key={index} />
              ))}
              <button onClick={toggleTrackList} className={"p-2 mt-2 text-sm font-bold text-[#b3b3b3] hover:text-[#fff]"}>
                {isExpanded ? "간단히 보기" : "자세히 보기"}
              </button>
            </div>
          </div>

          {/* 아티스트 추천 */}
          <div className={"p-4 bg-[#121212]"}>
            <h3 className={"text-2xl font-bold"}>아티스트 추천</h3>
          </div>

          {/* 인기 음악 */}
          <div className={"p-4 bg-[#121212]"}>
            <h3 className={"text-2xl font-bold mb-2"}>인기 음악</h3>
            <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"} style={{ marginInline: "-12px" }}>
              <SquareInfoCard />
              <SquareInfoCard />
              <SquareInfoCard />
              <SquareInfoCard />
            </div>
          </div>

          {/* 피처링 */}
          <div className={"p-4 bg-[#121212]"}>
            <h3 className={"text-2xl font-bold"}>가수명 피처링</h3>
          </div>

          {/* 공연일정 */}
          <div className={"p-4 bg-[#121212]"}>
            <h3 className={"text-2xl font-bold"}>공연 일정</h3>
          </div>

          {/* 팬들이 좋아하는 다른 음악 */}
          <div className={"p-4 bg-[#121212]"}>
            <h3 className={"text-2xl font-bold"}>팬들이 좋아하는 다른 음악</h3>
            <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"} style={{ marginInline: "-12px" }}>
              <RoundInfoCard />
              <RoundInfoCard />
              <RoundInfoCard />
              <RoundInfoCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistInfoPage;

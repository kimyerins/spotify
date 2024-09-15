import React from 'react';
import { useSearchTracks } from '../../hooks/useSearchTracks';
import { useParams } from 'react-router-dom';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import {useTrackByID} from "../../hooks/useTrackByID.js";

const TrackDetailPage = () => {
  const { name } = useParams();
  const {data:track, isLoading} = useTrackByID(name)
  let info = null;


  console.log('tackkk',info)
  console.log('aaaa',track)

  // ms를 시간 형식으로 변환하는 함수
  function msToTimeFormat(ms) {
    const minutes = Math.floor(ms / 60000); // 밀리초를 분으로 변환
    const seconds = Math.floor((ms % 60000) / 1000); // 나머지 밀리초를 초로 변환

    // 초가 10보다 작으면 앞에 0을 추가하여 2자리로 만들기
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
  }

  // 로딩 중이거나 데이터가 없을 때
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full bg-[#121212] text-white p-6">
      {/* 앨범 커버 및 정보 */}
      <div className="flex align-bottom">
        {/* 앨범 커버 */}
        <div className="w-[250px] h-fit">
          {track.album?.images?.[0]?.url ? (
            <img
              src={track.album.images[0].url}
              alt="album-cover"
              className="w-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-500">No Image</div>
          )}
        </div>

        {/* 곡 정보 */}
        <div className="ml-6 flex flex-col justify-center">
          <span className="text-sm text-gray-400 mb-2">곡</span>
          <h1 className="text-4xl font-extrabold">{track.name}</h1>
          <div className="text-gray-400 mt-4">
            <span className="font-semibold text-white">
              {track.artists[0]?.name}</span> • <span className="text-white">
              {track.album?.name}</span> • <span>
              {track.album?.release_date?.slice(0, 4)}</span> • <span>
              {msToTimeFormat(track?.duration_ms)}</span> • <span>
              🌠{track.popularity}</span>
          </div>
        </div>
      </div>

      {/* 재생 버튼 */}
      <div className="flex items-center gap-2 mt-8">
        <button className="bg-[#1ed760] w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#1fdf64] transform hover:scale-105">
          <svg role="img" height="24" width="24" viewBox="0 0 24 24" className="fill-current text-black">
            <polygon points="5,3 19,12 5,21"></polygon>
          </svg>
        </button>
        <div data-tooltip-id="add-tooltip" className="group btn p-[8px] cursor-pointer">
          <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="w-6 h-6 group-hover:fill-white" fill="#b3b3b3">
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
            <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path>
          </svg>
        </div>
        <ReactTooltip id="add-tooltip" place="top" content="내 라이브러리에 저장하기" className="!px-2 !py-1" />
        <div data-tooltip-id="etc-menu-tooltip" className="group btn p-[8px] cursor-pointer">
          <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 text-[#b3b3b3] group-hover:fill-white hover:text-white transition-all duration-250 ease-in-out">
            <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
          </svg>
        </div>
        <ReactTooltip id="etc-menu-tooltip" place="top" content={track.name+'에 대한 추가 옵션'} className="!px-2 !py-1" />
      </div>

    </div>
  );
};

export default TrackDetailPage;

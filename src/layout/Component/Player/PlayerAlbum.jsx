import React from "react";

const PlayerAlbum = ({ playerState, refetchPlayerState }) => {
  if (!playerState) {
    console.log("현재 재생중인 곡이 없습니다.");
  }

  return (
    <div>
      <div className="music_wrap flex items-center">
        <div className="album rounded-[5px] overflow-hidden w-[56px] h-[56x] mr-[8px]">
          <img src={playerState?.item.album.images[0]?.url} alt="album image" />
        </div>
        <div className="txts mx-[8px]">
          <p className="text-white text-[14px]">{playerState?.item.name}</p>
          <p className="text-[#b3b3b3] text-[12px]">
            {playerState?.item.artists[0].name}
          </p>
        </div>
        <div className="add btn p-[8px]">
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="Svg-sc-ytk21e-0 dYnaPI w-[16px] h-[16px]"
            fill={"#b3b3b3"}
          >
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
            <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PlayerAlbum;

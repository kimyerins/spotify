import React, { useState } from "react";

const TrackTypeSmall = ({ type }) => {
  // type 종류 : album, artist, playlist
  // 재생중인 노래 스타일 적용 필요
  // 더보기, hover 팝업 효과 만들기
  // 좋아요 표시한 곡인지
  const [isLike, setisLike] = useState(true);

  return (
    <div className="group flex items-center justify-between rounded-lg px-4 py-1 cursor-pointer transition duration-300 hover:bg-white/10">
      {/* 재생 버튼 or 인덱스 번호 */}
      <div className="flex items-center space-x-4">
        <div className="w-3 h-3 hidden group-hover:flex ml-[12px]">
          <svg
            viewBox="-0.5 0 8 8"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-427.000000, -3765.000000)"
                  fill="#ffffff"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <polygon
                      id="play-[#ffffff]"
                      points="371 3605 371 3613 378 3609"
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <span className="text-base font-bold text-[#afb5b5] flex group-hover:hidden">
          1
        </span>
        {/* 앨범이미지 */}

        <div className="flex flex-col">
          <h2 className="text-base font-semibold text-white hover:underline">
            {/* 노래명 */}Song
          </h2>
        </div>
      </div>

      {type === "album" ? (
        <p className="text-sm text-gray-300 group-hover:text-white hover:underline">
          {/* 앨범 아티스트 */}복숭아
        </p>
      ) : (
        ""
      )}

      {type === "artist" ? (
        <p className="text-sm text-gray-300 group-hover:text-white">
          {/* 재생수 */}45,233,853
        </p>
      ) : (
        ""
      )}

      <div className="flex items-center space-x-4">
        {/* 추가하기 버튼 */}
        {isLike ? (
          <div className="w-5 h-5 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg
              viewBox="0 0 24 24"
              id="meteor-icon-kit__solid-check-circle"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM7.56066 10.9393L10.5 13.8787L16.4393 7.93934C17.0251 7.35355 17.9749 7.35355 18.5607 7.93934C19.1464 8.52513 19.1464 9.47487 18.5607 10.0607L11.5607 17.0607C10.9749 17.6464 10.0251 17.6464 9.43934 17.0607L5.43934 13.0607C4.85355 12.4749 4.85355 11.5251 5.43934 10.9393C6.02513 10.3536 6.97487 10.3536 7.56066 10.9393Z"
                  fill="#0dc700"
                />
              </g>
            </svg>
          </div>
        ) : (
          <div className="w-5 h-5 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  fill="#afb5b5"
                  className="group-hover:fill-white"
                  fill-rule="evenodd"
                  d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm14 .069a1 1 0 01-1 1h-2.931V14a1 1 0 11-2 0v-2.931H6a1 1 0 110-2h3.069V6a1 1 0 112 0v3.069H14a1 1 0 011 1z"
                />
              </g>
            </svg>
          </div>
        )}

        <span className="text-sm text-gray-300 mr-3">{/* 곡 길이 */}2:00</span>

        {/* 더보기 버튼 */}
        <div className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            fill="#ffffff"
            viewBox="0 0 32 32"
            enable-background="new 0 0 32 32"
            id="Glyph"
            version="1.1"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <path
                d="M16,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S17.654,13,16,13z"
                id="XMLID_287_"
              />
              <path
                d="M6,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S7.654,13,6,13z"
                id="XMLID_289_"
              />
              <path
                d="M26,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S27.654,13,26,13z"
                id="XMLID_291_"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TrackTypeSmall;

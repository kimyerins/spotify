import React from "react";
import PlayButton from "../assets/images/PlayButton.svg?react";
import { Link } from "react-router-dom";

/**
 * @function onClickPlay 음악 재생 이벤트
 * @param {string} imgShape 파라미터: "circle" -> 원형 이미지 사용시 전달
 */
const Card = ({
  title,
  subTitle,
  imgUrl,
  imgShape,
  onClickPlay,
  onClickCard,
  onClickSubTitle,
}) => {
  const defaultUrl =
    "https://i.namu.wiki/i/3B-OpZ4Zv3EHLm1L1u0vOWjT2Sy4uAT43W93T0QzZW-YhxaP8ECybTqzArW3u6xA86NG-GOWWPPnNyUgPMzllQ.webp";
  return (
    <div className="group display: inline-block">
      <div
        className="flex flex-col self-stretch flex-grow-0 flex-shrink-1 w-[181.5px] relative gap-2 p-3 rounded-md group-hover:bg-[#1E1E1E] cursor-pointer"
        onClick={() => {
          if (onClickCard) {
            onClickCard();
          }
        }}
      >
        <div className="flex justify-center items-center w-[157.5px] h-[157.5px] relative">
          <div className="flex justify-center items-center overflow-hidden shadow-custom">
            <img
              src={imgUrl || defaultUrl}
              alt="card-img"
              width={300}
              height={300}
              className={imgShape != "circle" ? "rounded-md" : "rounded-full"}
            />
          </div>
          <div
            className="absolute right-2 bottom-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-2"
            onClick={(e) => {
              e.stopPropagation();
              if (onClickPlay) {
                onClickPlay();
              }
            }}
          >
            <PlayButton
              width={48}
              height={48}
              fill="#1ED760"
              className=" hover:scale-105 hover:fill-[#3AE276]"
            />
          </div>
        </div>
        <div className="flex flex-col self-stretch flex-grow-0 flex-shrink-1 gap-1">
          <div className="text-white flex self-stretch flex-grow-1 flex-shrink-1 overflow-hidden text-ellipsis  ">
            <span className="text-[16px]  line-clamp-2">{title}</span>
          </div>
          <div className="text-[#B3B3B3] flex self-stretch flex-grow-1 flex-shrink-1 text-ellipsis">
            <span
              className="text-[14px] hover:underline line-clamp-2"
              onClick={(e) => {
                e.stopPropagation();
                if (onClickSubTitle) {
                  onClickSubTitle();
                }
              }}
            >
              {subTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

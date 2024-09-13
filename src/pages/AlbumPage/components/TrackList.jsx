import { useState } from "react";
import TrackTypeList from "./TrackTypeList";
import TrackTypeSmall from "./TrackTypeSmall";

const TrackList = ({ viewOptionBox }) => {
  const { viewOption, setViewOption } = viewOptionBox;
  return (
    <div className="text-white  mt-8 ">
      <div className="flex justify-between px-4  pb-2 border-b opacity-70 w-full">
        <div className="flex gap-4 ml-5 ">
          <span>#</span>
          <span>제목</span>
        </div>
        {viewOption == "small" && <div>아티스트</div>}
        <div className="w-[114px] flex justify-center">
          <span>
            <svg
              className="w-6 h-6 text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </span>
        </div>
      </div>
      {/* 트랙리스트 */}
      {viewOption == "list" ? (
        <div className="p-1">
          <TrackTypeList type="album" />
          <TrackTypeList type="album" />
          <TrackTypeList type="album" />
          <TrackTypeList type="album" />
        </div>
      ) : (
        <div className="p-1">
          <TrackTypeSmall type="album" />
          <TrackTypeSmall type="album" />
          <TrackTypeSmall type="album" />
          <TrackTypeSmall type="album" />
          <TrackTypeSmall type="album" />
          <TrackTypeSmall type="album" />
        </div>
      )}
    </div>
  );
};

export default TrackList;

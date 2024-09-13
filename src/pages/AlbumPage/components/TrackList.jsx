import React from "react";
import TrackListCard from "../../../common/InfoCard/TrackListCard";

const TrackList = () => {
  return (
    <div className="text-white m-3">
      <div className="flex justify-between pl-4 pr-10 pb-2 border-b opacity-70">
        <div className="flex gap-4 ">
          <span>#</span>
          <span>제목</span>
        </div>
        <div className="">
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
      <div>트랙리스트</div>
    </div>
  );
};

export default TrackList;

import React from "react";

const ViewOptionBox = ({ viewOptionState }) => {
  const { viewOption, setViewOption } = viewOptionState;

  return (
    <div className="z-10 w-[160px] p-1 flex flex-col absolute right-0 rounded-md bg-[#282828]">
      <ul className="text-white font-semibold tracking-tighter opacity-80">
        <li
          className={`py-3 pl-3 pr-2 flex gap-3 items-center text-xs rounded-sm`}
        >
          보기설정
        </li>
        <li
          className="py-3 pl-3 pr-2 flex gap-3 items-center justify-between rounded-sm hover:bg-[#3E3D3D]"
          onClick={(e) => {
            e.stopPropagation();
            setViewOption("small");
          }}
        >
          <div className="flex items-center gap-1">
            <svg
              class={`w-6 h-6   dark:text-white 
                 ${viewOption == "small" ? "text-[#1ED760]" : "text-[#fff]"}
                
                `}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
            <span className={viewOption == "small" && "text-[#1ED760]"}>
              작게
            </span>
          </div>
          <svg
            className={`w-6 h-6  dark:text-white
                ${viewOption == "small" ? "text-[#1ED760]" : "text-[#fff]"}`}
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
              d="M5 11.917 9.724 16.5 19 7.5"
            />
          </svg>
        </li>
        <li
          className="py-3 pl-3 pr-2 flex gap-3 items-center justify-between rounded-sm hover:bg-[#3E3D3D]"
          onClick={(e) => {
            e.stopPropagation();
            setViewOption("list");
          }}
        >
          <div className="flex items-center gap-1">
            <svg
              class={`w-6 h-6  dark:text-white ${
                viewOption == "list" ? "text-[#1ED760]" : "text-[#fff]"
              } `}
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
                strokeWidth="2"
                d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"
              />
            </svg>
            <span className={viewOption == "list" && "text-[#1ED760]"}>
              목록
            </span>
          </div>
          <svg
            className={`w-6 h-6 dark:text-white     ${
              viewOption == "list" ? "text-[#1ED760]" : "text-[#fff]"
            }`}
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
              d="M5 11.917 9.724 16.5 19 7.5"
            />
          </svg>
        </li>
      </ul>
    </div>
  );
};

export default ViewOptionBox;

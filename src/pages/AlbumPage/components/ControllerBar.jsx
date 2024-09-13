import PlayButton from "../../../assets/images/PlayButton.svg?react";
import { useState } from "react";
import AddButton from "../../../assets/images/AddButton.svg?react";
import RadioButton from "../../../assets/images/RadioButton.svg?react";
import AddPlayButton from "../../../assets/images/AddPlayButton.svg?react";
import ViewOptionBox from "./ViewOptionBox";

const ControllerBar = ({ viewOptionBox }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false); // 옵션이 열려있는지 여부
  const [isViewOptionOpen, setIsViewOptionOpen] = useState(false); // 보기 옵션이 열려있는지 여부
  const { viewOption, setViewOption } = viewOptionBox;
  const viewOptionState = {
    viewOption: viewOption,
    setViewOption: setViewOption,
  };
  return (
    <div className="flex justify-between items-center ">
      <div className="flex items-center gap-4">
        {/* 재생 버튼 */}
        <div className="cursor-pointer">
          <PlayButton
            width={56}
            height={56}
            fill="#1ED760"
            className=" hover:scale-105 hover:fill-[#3AE276]"
          />
        </div>
        {/* (+) 추가하기 버튼 */}
        <div className="cursor-pointer ">
          <svg
            class="w-9 h-9 text-[#b3b3b3]  hover:text-white hover:scale-[104%] dark:text-white "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width={56}
            height={56}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        {/* 옵션 버튼 */}
        <div
          className="cursor-pointer relative"
          onClick={() => {
            setIsOptionOpen(!isOptionOpen);
          }}
        >
          <svg
            class="w-9 h-9 text-[#b3b3b3]  hover:text-white hover:scale-105 dark:text-white"
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
              stroke-width="3"
              d="M6 12h.01m6 0h.01m5.99 0h.01"
            />
          </svg>
          {/* 옵션 메뉴 */}

          {isOptionOpen && (
            <div className="z-10 absolute  rounded-md w-[220px] p-1 bg-[#282828]">
              <ul className="text-white text-sm font-semibold tracking-tighter opacity-80 rounded-md">
                <li className="py-3 pl-3 pr-2 flex items-center gap-3 rounded-sm hover:bg-[#3E3D3D]">
                  <AddButton width={18} height={18} color="white" />
                  <span>내 라이브러리에 추가하기</span>
                </li>
                <li className="py-3 pl-3 pr-2 flex gap-3 items-center  rounded-sm hover:bg-[#3E3D3D]">
                  <RadioButton width={16} height={16} color="white" />
                  <span>아티스트 라디오 보러가기</span>
                </li>
                <li className="py-3 pl-3 pr-2 flex gap-3 items-center  rounded-sm hover:bg-[#3E3D3D]">
                  <AddPlayButton width={16} height={16} color="white" />
                  <span>재생목록에 추가하기</span>
                </li>
                <li className="py-3 pl-3 pr-2 flex gap-3 items-center  justify-between rounded-sm  border-t border-[#3E3D3D] hover:bg-[#3E3D3D]">
                  <div className="flex gap-2 items-center">
                    <svg
                      className="w-5 h-5 text-white dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14m-7 7V5"
                      />
                    </svg>
                    <span>플레이리스트에 추가하기</span>
                  </div>
                  <svg
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className={"w-4 h-4 rotate-90"}
                    fill="hsla(0,0%,100%,.9)"
                  >
                    <path d="M14 10 8 4l-6 6h12z" />
                  </svg>
                </li>
                <li className="py-3 pl-3 pr-2 flex gap-2 items-center justify-between  rounded-sm  border-y border-[#3E3D3D] hover:bg-[#3E3D3D]">
                  <div className="flex gap-3 items-center ">
                    <svg
                      className="w-4 h-4 text-white dark:text-white "
                      role="img"
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      fill="#fff"
                    >
                      <path d="M1 5.75A.75.75 0 0 1 1.75 5H4v1.5H2.5v8h11v-8H12V5h2.25a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75v-9.5z" />
                      <path d="M8 9.576a.75.75 0 0 0 .75-.75V2.903l1.454 1.454a.75.75 0 0 0 1.06-1.06L8 .03 4.735 3.296a.75.75 0 0 0 1.06 1.061L7.25 2.903v5.923c0 .414.336.75.75.75z" />
                    </svg>
                    <span>공유</span>
                  </div>
                  <svg
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className={"w-4 h-4 rotate-90"}
                    fill="hsla(0,0%,100%,.9)"
                  >
                    <path d="M14 10 8 4l-6 6h12z" />
                  </svg>
                </li>
                <li className="py-3 pl-3 pr-2 flex gap-3 items-center  rounded-sm hover:bg-[#3E3D3D]">
                  <svg
                    className="w-4 h-4 text-white dark:text-white "
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="#fff"
                  >
                    <path d="M8.319.006A8.003 8.003 0 0 0 .006 7.683a7.998 7.998 0 0 0 7.677 8.31A8 8 0 0 0 8.319.006Zm3.377 11.72a.478.478 0 0 1-.652.179 9.612 9.612 0 0 0-3.426-1.165 9.599 9.599 0 0 0-3.613.176.479.479 0 0 1-.226-.93c1.3-.316 2.637-.38 3.972-.193 1.336.188 2.602.62 3.765 1.28.228.13.309.422.178.652l.002.001Zm1.05-2.1a.62.62 0 0 1-.841.25A11.793 11.793 0 0 0 7.923 8.57a11.775 11.775 0 0 0-4.188.158.622.622 0 0 1-.74-.473.62.62 0 0 1 .473-.739 13.032 13.032 0 0 1 4.626-.176c1.552.217 3.031.704 4.4 1.444a.62.62 0 0 1 .25.842h.003Zm1.166-2.367a.765.765 0 0 1-1.031.326 14.307 14.307 0 0 0-4.612-1.473 14.285 14.285 0 0 0-4.84.145.764.764 0 1 1-.303-1.499 15.812 15.812 0 0 1 5.356-.16c1.791.252 3.51.8 5.104 1.63.374.194.52.656.326 1.03Z" />
                  </svg>
                  <span>데스크탑에서 열기</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* 보기옵션 */}
      <div
        className="text-[#b3b3b3] text-sm flex items-center gap-1 cursor-pointer group "
        onClick={() => {
          setIsViewOptionOpen(!isViewOptionOpen);
        }}
      >
        {viewOption == "small" ? (
          <div className="flex items-center gap-1 relative">
            <span className="group-hover:text-white">작게</span>
            {/* 햄버거버튼 */}
            <svg
              class="w-6 h-6 text-[#b3b3b3]  dark:text-white  group-hover:text-white"
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
            {isViewOptionOpen && (
              <div className="absolute bottom-0 right-0">
                <ViewOptionBox viewOptionState={viewOptionState} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1 relative">
            <span className="group-hover:text-white">목록</span>
            {/* 리스트버튼 */}
            <svg
              class="w-7 h-7 text-[#b3b3b3]  dark:text-white   group-hover:text-white"
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
            {isViewOptionOpen && (
              <div className="absolute bottom-0 right-0">
                <ViewOptionBox viewOptionState={viewOptionState} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ControllerBar;

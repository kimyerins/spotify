import React, { useState } from "react";
import RoundInfoCard from "../../common/InfoCard/RoundInfoCard";
import SquareInfoCard from "../../common/InfoCard/SquareInfoCard";
import TrackListCard from "../../common/InfoCard/TrackListCard";

const ArtistInfoPage = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePopup = () => {
    console.log("on");
    setPopupVisible(!popupVisible);
  };

  const toggleTrackList = () => {
    setIsExpanded(!isExpanded);
  };

  const trackListCount = isExpanded ? 10 : 5;

  return (
    <div
      className={
        "w-[100%] ArtistInfoPage overflow-hidden rounded-[10px] bg-[#121212] mr-2"
      }
      style={{ color: "white" }}
    >
      <div className={"w-[100%] topbar"}></div>

      <div className={"w-[100%] h-calc-100vh-minus-5rem"}>
        {/* 배너 */}
        <div>
          <div
            className={
              "w-[100%] h-80 bg-cover bg-top under-banner w-webkit-fill-available scale-110 fixed top-20"
            }
            style={{
              backgroundImage: `url(https://i.scdn.co/image/ab6761860000101625102f761ef406c4b6789b27)`,
            }}
          ></div>
        </div>
        {/* 콘텐츠 */}
        <div
          className={
            "w-[100%] h-svh info-container relative overflow-y-scroll overflow-x-clip"
          }
        >
          {/* 상단 타이틀 */}
          <div className={"p-4 h-80 flex flex-col justify-center"}>
            <div className={"flex items-center gap-2.5"}>
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="#4cb3ff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="20%" y="20%" width="60%" height="60%" fill="white" />
                <path d="M10.814.5a1.658 1.658 0 0 1 2.372 0l2.512 2.572 3.595-.043a1.658 1.658 0 0 1 1.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 0 1-1.678 1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 0 1-2.372 0l-2.512-2.572-3.595.043a1.658 1.658 0 0 1-1.678-1.678l.043-3.595L.5 13.186a1.658 1.658 0 0 1 0-2.372l2.572-2.512-.043-3.595a1.658 1.658 0 0 1 1.678-1.678l3.595.043L10.814.5zm6.584 9.12a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308 7.425-7.425z" />
              </svg>
              <p>확인된 아티스트</p>
            </div>
            <h2 className={"text-8xl font-extrabold"}>aespa</h2>
            <div>
              월별 리스너 <span>10,710,907</span>명
            </div>
          </div>

          {/* 재생 버튼 바 */}
          <div className={"p-4 flex items-center gap-4 bg-[#121212]"}>
            <div>
              <span className="bg-[#1ed760] w-14 h-14 flex items-center justify-center rounded-full hover:bg-[#3be477] cursor-pointer">
                <svg
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-[#000000]" // SVG 크기와 색상 설정
                  fill="currentColor"
                >
                  <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                </svg>
              </span>
            </div>
            <button
              className={
                "px-4 py-1.5 rounded-full text-sm font-bold border border-solid border-[#656565] hover:border-white"
              }
            >
              팔로우하기
            </button>
            {/* Popup Menu */}
            <div className={"relative"}>
              <button
                aria-hidden="true"
                className={"text-8xl font-extrabold"}
                onClick={togglePopup}
              >
                <svg
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className={
                    "w-8 h-8 text-[#656565] hover:text-white  transition-all duration-250 ease-in-out"
                  }
                  fill="currentColor"
                >
                  <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
                </svg>
              </button>
              {popupVisible && (
                <div
                  className={
                    "menu-popup w-[220px] absolute top-10 left-0 overflow-hidden rounded-[5px]"
                  }
                >
                  <ul className={"p-1 bg-[#282828]"}>
                    <li
                      className={
                        "p-3 bg-[#282828] hover:bg-[hsla(0,0%,100%,.1)] overflow-hidden rounded-[2px]"
                      }
                    >
                      <button className={"flex items-center gap-2"}>
                        <svg
                          role="img"
                          aria-hidden="true"
                          viewBox="0 0 16 16"
                          className={"w-4 h-4"}
                          fill="#b3b3b3"
                        >
                          <path d="M4.765 1.423c-.42.459-.713.992-.903 1.554-.144.421-.264 1.173-.22 1.894.077 1.321.638 2.408 1.399 3.316v.002l.083.098c.611.293 1.16.696 1.621 1.183a2.244 2.244 0 0 0-.426-2.092l-.127-.153-.002-.001c-.612-.73-.997-1.52-1.051-2.442-.032-.54.066-1.097.143-1.323a2.85 2.85 0 0 1 .589-1.022 2.888 2.888 0 0 1 4.258 0c.261.284.456.628.59 1.022.076.226.175.783.143 1.323-.055.921-.44 1.712-1.052 2.442l-.002.001-.127.153a2.25 2.25 0 0 0 .603 3.39l2.209 1.275a3.248 3.248 0 0 1 1.605 2.457h-5.99a5.466 5.466 0 0 1-.594 1.5h8.259l-.184-1.665a4.75 4.75 0 0 0-2.346-3.591l-2.209-1.275a.75.75 0 0 1-.201-1.13l.126-.152h.001c.76-.909 1.32-1.995 1.399-3.316.043-.721-.077-1.473-.22-1.894a4.46 4.46 0 0 0-.644-1.24v-.002h-.002a4.388 4.388 0 0 0-6.728-.312zM2 12.5v-2h1.5v2h2V14h-2v2H2v-2H0v-1.5h2z" />
                        </svg>
                        <span
                          className={
                            "text-sm text-white font-semibold tracking-tighter opacity-90"
                          }
                        >
                          팔로우하기
                        </span>
                      </button>
                    </li>
                    <li
                      className={
                        "p-3 bg-[#282828] hover:bg-[hsla(0,0%,100%,.1)] overflow-hidden rounded-[2px]"
                      }
                    >
                      <button className={"flex items-center gap-2"}>
                        <svg
                          role="img"
                          aria-hidden="true"
                          viewBox="0 0 16 16"
                          className={"w-4 h-4"}
                          fill="#b3b3b3"
                        >
                          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM3.965 2.904a6.5 6.5 0 0 1 9.131 9.131L3.965 2.904zm-1.061 1.06 9.131 9.132a6.5 6.5 0 0 1-9.131-9.131z" />
                        </svg>
                        <span
                          className={
                            "text-sm text-white font-semibold tracking-tighter opacity-90"
                          }
                        >
                          이 아티스트 재생 안 함
                        </span>
                      </button>
                    </li>
                    <li
                      className={
                        "p-3 bg-[#282828] hover:bg-[hsla(0,0%,100%,.1)] overflow-hidden rounded-[2px]"
                      }
                    >
                      <button className={"flex items-center gap-2"}>
                        <svg
                          role="img"
                          aria-hidden="true"
                          viewBox="0 0 16 16"
                          className={"w-4 h-4"}
                          fill="#b3b3b3"
                        >
                          <path d="M5.624 3.886A4.748 4.748 0 0 0 3.25 8c0 1.758.955 3.293 2.375 4.114l.75-1.3a3.249 3.249 0 0 1 0-5.63l-.75-1.298zm4.001 1.299.75-1.3A4.748 4.748 0 0 1 12.75 8a4.748 4.748 0 0 1-2.375 4.114l-.75-1.3a3.249 3.249 0 0 0 0-5.63zM8 6.545a1.455 1.455 0 1 0 0 2.91 1.455 1.455 0 0 0 0-2.91z" />
                          <path d="M4 1.07A7.997 7.997 0 0 0 0 8a7.997 7.997 0 0 0 4 6.93l.75-1.3A6.497 6.497 0 0 1 1.5 8a6.497 6.497 0 0 1 3.25-5.63L4 1.07zm7.25 1.3.75-1.3A7.997 7.997 0 0 1 16 8a7.997 7.997 0 0 1-3.999 6.93l-.75-1.3A6.497 6.497 0 0 0 14.5 8a6.497 6.497 0 0 0-3.25-5.63z" />
                        </svg>
                        <span
                          className={
                            "text-sm text-white font-semibold tracking-tighter opacity-90"
                          }
                        >
                          아티스트 라디오 보러가기
                        </span>
                      </button>
                    </li>
                    <li
                      className={
                        "p-3 bg-[#282828] hover:bg-[hsla(0,0%,100%,.1)] overflow-hidden rounded-[2px]"
                      }
                    >
                      <button
                        className={
                          "w-full flex items-center justify-between gap-2"
                        }
                      >
                        <div className={"flex items-center gap-2"}>
                          <svg
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            className={"w-4 h-4"}
                            fill="#b3b3b3"
                          >
                            <path d="M1 5.75A.75.75 0 0 1 1.75 5H4v1.5H2.5v8h11v-8H12V5h2.25a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75v-9.5z" />
                            <path d="M8 9.576a.75.75 0 0 0 .75-.75V2.903l1.454 1.454a.75.75 0 0 0 1.06-1.06L8 .03 4.735 3.296a.75.75 0 0 0 1.06 1.061L7.25 2.903v5.923c0 .414.336.75.75.75z" />
                          </svg>
                          <span
                            className={
                              "text-sm text-white font-semibold tracking-tighter opacity-90"
                            }
                          >
                            신고하기
                          </span>
                        </div>
                        <span>
                          <svg
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            className={"w-4 h-4 rotate-90"}
                            fill="hsla(0,0%,100%,.9)"
                          >
                            <path d="M14 10 8 4l-6 6h12z" />
                          </svg>
                        </span>
                      </button>
                    </li>
                    <li
                      className={
                        "p-3 bg-[#282828] hover:bg-[hsla(0,0%,100%,.1)] overflow-hidden rounded-[2px]"
                      }
                    >
                      <button
                        className={
                          "w-full flex items-center justify-between gap-2"
                        }
                      >
                        <div className={"flex items-center gap-2"}>
                          <svg
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            className={"w-4 h-4"}
                            fill="#b3b3b3"
                          >
                            <path d="M1 5.75A.75.75 0 0 1 1.75 5H4v1.5H2.5v8h11v-8H12V5h2.25a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75v-9.5z" />
                            <path d="M8 9.576a.75.75 0 0 0 .75-.75V2.903l1.454 1.454a.75.75 0 0 0 1.06-1.06L8 .03 4.735 3.296a.75.75 0 0 0 1.06 1.061L7.25 2.903v5.923c0 .414.336.75.75.75z" />
                          </svg>
                          <span
                            className={
                              "text-sm text-white font-semibold tracking-tighter opacity-90"
                            }
                          >
                            공유
                          </span>
                        </div>
                        <span>
                          <svg
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            className={"w-4 h-4 rotate-90"}
                            fill="hsla(0,0%,100%,.9)"
                          >
                            <path d="M14 10 8 4l-6 6h12z" />
                          </svg>
                        </span>
                      </button>
                    </li>
                    <li
                      className={
                        "p-3 border-t border-[hsla(0,0%,100%,.1)] hover:bg-[hsla(0,0%,100%,.1)] overflow-hidden rounded-[2px]"
                      }
                    >
                      <button className={"flex items-center gap-2"}>
                        <svg
                          role="img"
                          aria-hidden="true"
                          viewBox="0 0 16 16"
                          className="w-4 h-4 text-gray-500"
                          fill="#b3b3b3"
                        >
                          <path d="M8.319.006A8.003 8.003 0 0 0 .006 7.683a7.998 7.998 0 0 0 7.677 8.31A8 8 0 0 0 8.319.006Zm3.377 11.72a.478.478 0 0 1-.652.179 9.612 9.612 0 0 0-3.426-1.165 9.599 9.599 0 0 0-3.613.176.479.479 0 0 1-.226-.93c1.3-.316 2.637-.38 3.972-.193 1.336.188 2.602.62 3.765 1.28.228.13.309.422.178.652l.002.001Zm1.05-2.1a.62.62 0 0 1-.841.25A11.793 11.793 0 0 0 7.923 8.57a11.775 11.775 0 0 0-4.188.158.622.622 0 0 1-.74-.473.62.62 0 0 1 .473-.739 13.032 13.032 0 0 1 4.626-.176c1.552.217 3.031.704 4.4 1.444a.62.62 0 0 1 .25.842h.003Zm1.166-2.367a.765.765 0 0 1-1.031.326 14.307 14.307 0 0 0-4.612-1.473 14.285 14.285 0 0 0-4.84.145.764.764 0 1 1-.303-1.499 15.812 15.812 0 0 1 5.356-.16c1.791.252 3.51.8 5.104 1.63.374.194.52.656.326 1.03Z" />
                        </svg>
                        <span
                          className={
                            "text-sm text-white tracking-tighter opacity-90"
                          }
                        >
                          데스크톱 앱에서 열기
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* 인기 노래 리스트 */}
          <div className={"p-4 bg-[#121212]"}>
            <h3 className={"text-2xl font-bold"}>인기</h3>
            <div className={"p-4"}>
              {/* TrackListCard 컴포넌트를 trackListCount 수만큼 렌더링 */}
              {[...Array(trackListCount)].map((_, index) => (
                <TrackListCard key={index} />
              ))}
              {/* '자세히 보기' / '간단히 보기' 버튼 */}
              <button
                onClick={toggleTrackList}
                className={
                  "p-2 mt-2 text-sm font-bold text-[#b3b3b3] hover:text-[#fff]"
                }
              >
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
            <div
              className={
                "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              }
              style={{ marginInline: "-12px" }}
            >
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
            <div
              className={
                "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              }
              style={{ marginInline: "-12px" }}
            >
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

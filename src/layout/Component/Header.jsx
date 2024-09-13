import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useSpotifyToken from "../../hooks/useSpotifyToken";
import { useDispatch } from "react-redux";
import { userInfoActions } from "../../redux/reducer/userInfoSlice.jsx";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useUserInfo } from "../../hooks/useUserInfo.jsx";

const Header = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // 드롭박스를 감지하기 위한 ref
  const { login, clearToken, token } = useSpotifyToken();
  const dispatch = useDispatch();
  const location = useLocation();
  const { data: user, error, isLoading } = useUserInfo();

  useEffect(() => {
    // 드롭다운 외부 클릭을 감지하는 이벤트 핸들러
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const logout = () => {
    clearToken();
    dispatch(userInfoActions.logout)
  }

  return (
    <div className="ml-6 mr-2 my-2 flex justify-between">
      <Link to="/" className="self-center">
        <img
          src="../src/assets/2024 Spotify Brand Assets/Spotify_Primary_Logo_RGB_White.png"
          alt="spotify"
          className="w-8 h-8 self-center ml-1"
        />
      </Link>

      <div className="flex gap-2">
        <Link to="/" data-tooltip-id="home-tooltip">
          <span className="home bg-[#1f1f1f] rounded-full w-12 h-12 flex justify-center">
            {location.pathname === '/'
              ? <svg className="self-center w-6 h-6" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff">
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                <g id="SVGRepo_iconCarrier">
                  <path fill="#ffffff" d="M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z" />
                </g>
              </svg>
              : <svg className="self-center w-6 h-6" fill="#b3b3b3" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                <path
                  fillRule="evenodd"
                  d="M192,1.42108547e-14 L384,153.6 L384,384 L213.333333,384 L213.333333,277.333333 L170.666667,277.333333 L170.666667,384 L0,384 L0,153.6 L192,0 Z M192,53.3333333 L42.6666667,170.666667 L42.6666667,341.333333 L128,341.333333 L128,234.666667 L256,234.666667 L256,341.333333 L341.333333,341.333333 L341.333333,170.666667 L192,53.3333333 Z"
                  transform="translate(64 64)"
                ></path>
              </svg>
            }
          </span>
        </Link>
        <ReactTooltip id="home-tooltip" place="top" content="홈" className="!px-2 !py-1" />
        <Link to="/search">
          <div
            className={`search-box group flex gap-4 items-center bg-[#1f1f1f] text-white rounded-full px-4 py-2 h-12 w-[474px] cursor-pointer 
              hover:border-solid hover:border-[0.2px] hover:border-gray-500 hover:bg-[#2b2b2b] ${isFocused ? "border-2 border-white" : ""
              }`}
          >
            <svg
              className="self-center w-8 h-8"
              data-tooltip-id='search-tooltip'
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#b3b3b3"
            >
              <path
                className={`group-hover:stroke-white ${isFocused ? 'stroke-white' : ''}`}
                d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="#b3b3b3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <ReactTooltip id="search-tooltip" place="top" content="검색하기" className="!px-2 !py-1" />
            <span className="w-full border-r-[1px] border-solid border-[#b3b3b3] ">
              <input
                type="text"
                placeholder="어떤 콘텐츠를 감상하고 싶으세요?"
                className="search h-6 py-3 px-0 bg-transparent border-none w-4/5 outline-none text-[16px] text-white placeholder:text-[#b3b3b3] focus:outline-none focus:ring-0 cursor-pointer"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </span>
            {location.pathname === 'search'
              ? <svg
                className={`self-center w-7 h-7 hover:stroke-white ${isFocused ? "fill-white stroke-none" : ""}`}
                data-tooltip-id="look-around-tooltip"
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 24 24"
                stroke="#b3b3b3"
                fill="none"
                strokeWidth="2"
              >
                <path d="M4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4H4V2zM1.513 9.37A1 1 0 0 1 2.291 9H21.71a1 1 0 0 1 .978 1.208l-2.17 10.208A2 2 0 0 1 18.562 22H5.438a2 2 0 0 1-1.956-1.584l-2.17-10.208a1 1 0 0 1 .201-.837zM12 17.834c1.933 0 3.5-1.044 3.5-2.333 0-1.289-1.567-2.333-3.5-2.333S8.5 14.21 8.5 15.5c0 1.289 1.567 2.333 3.5 2.333z"></path>
              </svg>
              : <svg data-tooltip-id="look-around-tooltip" className="w-7 h-7 self-center" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" fill="white" >
                <path d="M4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4H4V2zM1.513 9.37A1 1 0 0 1 2.291 9H21.71a1 1 0 0 1 .978 1.208l-2.17 10.208A2 2 0 0 1 18.562 22H5.438a2 2 0 0 1-1.956-1.584l-2.17-10.208a1 1 0 0 1 .201-.837zM12 17.834c1.933 0 3.5-1.044 3.5-2.333 0-1.289-1.567-2.333-3.5-2.333S8.5 14.21 8.5 15.5c0 1.289 1.567 2.333 3.5 2.333z"></path>
              </svg>
            }
            <ReactTooltip id="look-around-tooltip" place="bottom" content="둘러보기" className="!px-2 !py-1" />
          </div>
        </Link>
      </div>

      <div className="flex text-white self-center">
        {token ? (
          <div className="flex justify-center gap-4">
            <div className="flex justify-center self-center text-sm font-semibold gap-1 transform hover:scale-105 cursor-pointer hover:underline">
              <svg className="w-5 h-5 self-center" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="5" />
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                <g id="SVGRepo_iconCarrier"> <path d="M31.667 45.024V18.024" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M22.667 39.024L31.667 45.024L40.666 39.024" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M31.667 58.191C46.3948 58.191 58.334 46.2518 58.334 31.5241C58.334 16.7963 46.3948 4.85706 31.667 4.85706C16.9392 4.85706 5 16.7963 5 31.5241C5 46.2518 16.9392 58.191 31.667 58.191Z" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                </g>
              </svg>
              앱 설치하기
            </div>
            <svg data-tooltip-id="feed-tooltip" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16"
              fill={location.pathname === 'content-feed' ? 'white' : ''}
              stroke={location.pathname === 'content-feed' ? '' : '#b3b3b3'}
              className="w-4 h-[17px] self-center mx-4 cursor-pointer hover:stroke-white hover:stroke-2">
              <path d="M8 0a5.5 5.5 0 0 0-5.5 5.5v3.069L.307 12.376A.75.75 0 0 0 .25 13h15.5a.75.75 0 0 0-.057-.624L13.5 8.567V5.5A5.5 5.5 0 0 0 8 0zm1.937 14.5H6.063a2 2 0 0 0 3.874 0z" />
            </svg>
            <ReactTooltip id="feed-tooltip" place="top" content="새소식" className="!px-2 !py-1" />
            <div className="flex flex-col text-white relative" ref={dropdownRef}>
              <div
                data-tooltip-id="profile-tooltip"
                className="w-10 h-10 rounded-full cursor-pointer bg-white"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              <ReactTooltip id="profile-tooltip" place="bottom" content={user?.display_name} className="!px-2 !py-1" />
              {isDropdownOpen && (
                <div className="absolute right-0 top-14 z-10 bg-[#282828] divide-y divide-[#464646] rounded-lg shadow w-44">
                  <ul className="py-2 text-sm bg-[#282828] text-[#eaeaea] rounded-[4px]">
                    <li>
                      <Link to="/" className="flex justify-between px-4 py-2 hover:bg-[#464646]">
                        계정
                        <svg className="w-4 h-4" fill="white" data-encore-id="icon" role="img" aria-label="외부 링크" aria-hidden="true" viewBox="0 0 16 16">
                          <path d="M1 2.75A.75.75 0 0 1 1.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75V2.75z" />
                          <path d="M15 1v4.993a.75.75 0 1 1-1.5 0V3.56L8.78 8.28a.75.75 0 0 1-1.06-1.06l4.72-4.72h-2.433a.75.75 0 0 1 0-1.5H15z" />
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="block px-4 py-2 hover:bg-[#464646] "
                      >
                        프로필
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="block px-4 py-2 hover:bg-[#464646]">
                        설정
                      </Link>
                    </li>
                  </ul>
                  <div className="py-1">
                    <div
                      className="block px-4 py-2 text-sm bg-[#282828] hover:bg-[#464646] cursor-pointer"
                      onClick={logout}
                    >
                      로그아웃
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <a href="https://www.spotify.com/kr-ko/signup?forward_url=https%3A%2F%2Fopen.spotify.com%2F">
              <button
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-base font-semibold text-[#969696] focus:outline-none bg-transparent rounded-full 
                            hover:scale-105 hover:text-white"
              >
                가입하기
              </button>
            </a>
            <button
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-base font-semibold text-gray-900 focus:outline-none bg-white rounded-full 
                            hover:scale-105 hover:bg-slate-50"
              onClick={login}
            >
              로그인하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

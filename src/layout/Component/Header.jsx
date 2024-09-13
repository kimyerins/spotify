import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useSpotifyToken from "../../hooks/useSpotifyToken";
import { useDispatch } from "react-redux";
import { userInfoActions } from "../../redux/reducer/userInfoSlice.jsx";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useUserInfo } from "../../hooks/useUserInfo.jsx";
import SearchBar from "./SearchBar.jsx";

const Header = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // 드롭박스를 감지하기 위한 ref
  const { login, clearToken, token } = useSpotifyToken();
  const dispatch = useDispatch();

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

  const logout=()=>{
    clearToken();
    dispatch(userInfoActions.logout)
  }

  return (
    <div className="ml-6 mr-2 my-2 flex justify-between">
      <Link to="/" className="self-center">
        <img
          src="../src/assets/2024 Spotify Brand Assets/Spotify_Primary_Logo_RGB_White.png"
          alt="spotify"
          className="min-w-8 h-8 self-center ml-1 mr-6"
        />
      </Link>

      <div className="flex gap-2">
        <Link to="/">
          <span className="home bg-[#1f1f1f] rounded-full w-12 h-12 flex justify-center">
            <svg
              className="self-center w-6 h-6"
              fill="#b3b3b3"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
            >
              <path
                fillRule="evenodd"
                d="M192,1.42108547e-14 L384,153.6 L384,384 L213.333333,384 L213.333333,277.333333 L170.666667,277.333333 L170.666667,384 L0,384 L0,153.6 L192,0 Z M192,53.3333333 L42.6666667,170.666667 L42.6666667,341.333333 L128,341.333333 L128,234.666667 L256,234.666667 L256,341.333333 L341.333333,341.333333 L341.333333,170.666667 L192,53.3333333 Z"
                transform="translate(64 64)"
              ></path>
            </svg>
          </span>
        </Link>
        <Link to="/search">
          <SearchBar isFocused={isFocused} setIsFocused={setIsFocused} />
        </Link>
      </div>

      <div className="flex text-white self-center">
        {token ? (
          <div className="flex flex-col text-white relative" ref={dropdownRef}>
            <div
              className="w-10 h-10 rounded-full cursor-pointer bg-white ml-6"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 top-14 z-10 bg-[#282828] divide-y divide-[#464646] rounded-lg shadow w-44">
                <ul className="py-2 text-sm bg-[#282828] text-[#eaeaea] rounded-[4px]">
                  <li>
                    <Link to="/" className="block px-4 py-2 hover:bg-[#464646]">
                      계정
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
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
const Layout = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className='bg-black'>
      <div className='mx-6 my-2 flex justify-between'>
        <img src='../src/assets/2024 Spotify Brand Assets/Spotify_Primary_Logo_RGB_White.png' alt='spotify'
          className='w-8 h-8 self-center ml-1' />

        <div className='flex gap-2'>
          <span className='home bg-[#1f1f1f] rounded-full w-12 h-12 flex justify-center'>
            <svg className='self-center w-6 h-6' fill="#b3b3b3" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                <path fill-rule="evenodd" d="M192,1.42108547e-14 L384,153.6 L384,384 L213.333333,384 L213.333333,277.333333 L170.666667,277.333333 L170.666667,384 L1.42108547e-14,384 L1.42108547e-14,153.6 L192,1.42108547e-14 Z M192,53.3333333 L42.6666667,170.666667 L42.6666667,341.333333 L128,341.333333 L128,234.666667 L256,234.666667 L256,341.333333 L341.333333,341.333333 L341.333333,170.666667 L192,53.3333333 Z" transform="translate(64 64)">
                </path>
              </g>
            </svg>
          </span>

          <div className={`search-box flex gap-4 items-center bg-[#1f1f1f] text-white rounded-full px-4 py-2 h-12 w-[474px] cursor-pointer hover:bg-[#404040] ${isFocused ? 'border-2 border-white' : ''}`}>
            <svg className='self-center w-6 h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#b3b3b3">
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#b3b3b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </g>
            </svg>

            <input
              type="text"
              placeholder="어떤 콘텐츠를 감상하고 싶으세요?"
              className="search bg-transparent border-none w-4/5 outline-none text-sm text-white placeholder:text-[#b3b3b3] focus:outline-none focus:ring-0"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            <svg className={`self-center 2-6 h-6 hover:stroke-white pl-2 border-l-[1px] border-solid border-[#b3b3b3] ${isFocused ? 'fill-white stroke-none' : ''}`}
             data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" stroke='#b3b3b3' fill='none' strokeWidth='2'>
              <path d="M4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4H4V2zM1.513 9.37A1 1 0 0 1 2.291 9H21.71a1 1 0 0 1 .978 1.208l-2.17 10.208A2 2 0 0 1 18.562 22H5.438a2 2 0 0 1-1.956-1.584l-2.17-10.208a1 1 0 0 1 .201-.837zM12 17.834c1.933 0 3.5-1.044 3.5-2.333 0-1.289-1.567-2.333-3.5-2.333S8.5 14.21 8.5 15.5c0 1.289 1.567 2.333 3.5 2.333z"></path></svg>
          </div>
        </div>

        <div className='flex text-white'>
          로그인/프로필/회원가입
        </div>

      </div>

      <h2 className="text-3xl font-bold text-white">Layout</h2>
      <Outlet />
    </div>
  )
}

export default Layout
import React, { useState, useEffect } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ isFocused, setIsFocused }) => {
    const navigator = useNavigate();
    // 검색어
    const [searchWord, setSearchWord] = useState('');
    // input 내용이 변할 때마다 searchWord을 업데이트
    const handleInputChange = (e) => {
        setSearchWord(e.target.value);
        navigator(`search/${searchWord}`);
    };
    return (
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
            <span className={`w-full ${searchWord ? 'border-none' : 'border-r-[1px] border-solid border-[#b3b3b3]'}`}>
                <input
                    type="text"
                    placeholder="어떤 콘텐츠를 감상하고 싶으세요?"
                    className="search h-6 py-3 px-0 bg-transparent border-none w-4/5 outline-none text-[16px] text-white placeholder:text-[#b3b3b3] focus:outline-none focus:ring-0 cursor-pointer"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={searchWord}
                    onChange={handleInputChange}  // 입력 변경 시 searchWord 업데이트
                />
            </span>
            <svg data-tooltip-id="search-clear-tooltip" className={`self-center w-8 h-8 ${searchWord? '' : 'hidden'}`} 
            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            onClick={()=>{setSearchWord('');}}>
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                <g id="SVGRepo_iconCarrier">
                    <path className='hover:fill-white' fill-rule="evenodd" clip-rule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" 
                    fill="#b3b3b3" />
                </g>
            </svg>
            <ReactTooltip id="search-clear-tooltip" place="bottom" content="검색 필드 지우기" className="!px-2 !py-1" />
            {location.pathname === 'search'
                ? <svg
                    className={`self-center w-7 h-7 hover:stroke-white ${isFocused ? "fill-white stroke-none" : ""} ${searchWord ? 'hidden' : ''}`}
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
                : <svg data-tooltip-id="look-around-tooltip" className={`w-7 h-7 self-center ${searchWord ? 'hidden' : ''}`} data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" fill="white" >
                    <path d="M4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4H4V2zM1.513 9.37A1 1 0 0 1 2.291 9H21.71a1 1 0 0 1 .978 1.208l-2.17 10.208A2 2 0 0 1 18.562 22H5.438a2 2 0 0 1-1.956-1.584l-2.17-10.208a1 1 0 0 1 .201-.837zM12 17.834c1.933 0 3.5-1.044 3.5-2.333 0-1.289-1.567-2.333-3.5-2.333S8.5 14.21 8.5 15.5c0 1.289 1.567 2.333 3.5 2.333z"></path>
                </svg>
            }
            <ReactTooltip id="look-around-tooltip" place="bottom" content="둘러보기" className="!px-2 !py-1" />
        </div>
    );
};

export default SearchBar;

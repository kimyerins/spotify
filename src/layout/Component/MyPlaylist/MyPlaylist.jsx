import React, {useEffect, useState} from 'react';
import {useUserPlaylist} from "../../../hooks/useUserPlaylist.js";
import Playlist from "./Playlist.jsx";
import {useSelector} from "react-redux";

const MyPlaylist = () => {

    let hidden={
    search:true,
    searchInput:false
}

    const [listBtn, setListBtn] = useState(false);
    const [myBtn, setMyBtn] = useState(false);
    const [hiddenCtrl, setHiddenCtrl] = useState(hidden);
    const [searchInputValue, setSearchInputValue] = useState('');
    const userId = useSelector((state)=>state.userInfo.user.id)
    const {data} = useUserPlaylist(userId);
    console.log('data',data)

    const handleListBtn =()=>{
    setListBtn(!listBtn)
}
    useEffect(()=>{
    if(!listBtn){
    setMyBtn(false)
}
},[listBtn]);

    useEffect(()=>{

},[hiddenCtrl])

    const handleMyBtn =()=> {
    setMyBtn(!myBtn)
}

    const searchFocus=()=>{
    setHiddenCtrl((prev)=>({
        ...prev,
        search: !prev.search
    }))
}

    const searchInputBtn=()=>{
    setHiddenCtrl((prev)=>({
        ...prev,
        searchInput: !prev.searchInput
    }))
}

    const searchClose=()=>{
    setSearchInputValue('')
}

    const searchInputChange = (e) => {
    setSearchInputValue(e.target.value);
};

    return(
    <div className={'h-[calc(100vh-140px)] min-w-[340px] mx-2 p-3 bg-[#121212] rounded-[10px]'}>
        <header className={'text-[rgb(105,105,105)]'}>
            <div className={'flex flex-row max-h-14'}>
                <div className={'p-1 basis-1/2'}>
                    <button className={'flex hover:text-white'}>
                    <span>
                        <svg data-encore-id="icon" role="img" aria-hidden="true"
                             className="w-[24px] h-[24px] mr-2" fill={'gray'}>
                        <path
                            d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
                    </svg>
                    </span>
                        내 라이브러리
                    </button>
                </div>
                <div className={'flex basis-1/2 justify-end'}>
            <span style={{
                display: "block"
            }}>
                <button className={'p-2 rounded-full hover:bg-[rgb(35,35,35)]'}>
                    <span>
                        <svg data-encore-id="icon" role="img" aria-hidden="true"
                             className={'w-[16px] h-[16px]'} fill={'gray'}><path
                            d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path></svg>
                    </span>
                </button>
            </span>
                    <span style={{
                        display: "block"
                    }}>
                <button className={'p-2 rounded-full hover:bg-[rgb(35,35,35)]'}>
                    <span>
                        <svg data-encore-id="icon" role="img" aria-hidden="true"
                             className={'w-[16px] h-[16px]'} fill={'gray'}><path
                            d="M7.19 1A.749.749 0 0 1 8.47.47L16 7.99l-7.53 7.521a.75.75 0 0 1-1.234-.815.75.75 0 0 1 .174-.243l5.72-5.714H.75a.75.75 0 1 1 0-1.498h12.38L7.41 1.529a.749.749 0 0 1-.22-.53z"></path></svg>
                    </span>
                </button>
            </span>
                </div>
            </div>
            <div className={'flex relative mt-6'}>
                <button
                    className={`bg-[rgb(37,37,37)] hover:bg-[rgb(35,35,35)] py-1.5 px-3 rounded-full text-sm ${!listBtn ? 'hidden' : ''} mr-2`}
                    onClick={handleListBtn}>X
                </button>
                <button
                    className={`${listBtn ? 'bg-white hover:bg-[rgb(237,237,237)] text-black' : 'bg-[rgb(37,37,37)]'} py-1.5 px-3 rounded-full text-sm z-10`}
                    onClick={handleListBtn}>플레이리스트
                </button>
                <button
                    className={`${!listBtn?'hidden':myBtn?'bg-[rgb(214,214,214)] hover:bg-[rgb(227,227,227)] text-black w-[95px] pl-6 pr-1 absolute left-28 -top-0':'bg-[rgb(37,37,37)] px-3'} py-1.5 rounded-full text-sm`}
                    onClick={handleMyBtn}>내가 만듦
                </button>
            </div>
        </header>
        <div className={'mt-4 h-[calc(100vh-275px)] rounded-b-[15px] overflow-hidden hover:overflow-y-auto custom-scrollbar'}>
            <div className={'flex relative items-center'}>
                <input
                    type={'text'}
                    className={`'w-3/5 h-8 pl-[30px] bg-[rgb(37,37,37)] border-0 rounded text-sm text-[rgb(96,96,96)] absolute left-0 focus:ring-0 ${hiddenCtrl.searchInput?'':'hidden'}`}
                    value={searchInputValue}
                    placeholder={'플레이리스트에서 검색'}
                    onChange={searchInputChange}
                    onFocus={searchFocus}
                />
                <div className={`p-2 absolute left-0 -top-1 flex items-center ${searchInputValue===''?'hidden':''}`}>
                <span className={'w-40 py-1'}>
                    <svg data-encore-id="icon" role="img" aria-hidden="true"
                         className="Svg-sc-ytk21e-0 dYnaPI CIVozJ8XNPJ60uMN23Yg w-[16px] h-[16px]" fill={'gray'}><path
                        d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z"></path>
                    </svg>
                </span>
                    <button className={'w-4'} onClick={searchClose}>
                        X
                    </button>
                </div>
                <button className={'p-2 z-10 rounded-full hover:bg-[rgb(37,37,37)]'}
                        aria-hidden="false"
                        aria-label="플레이리스트에서 검색"
                        onClick={searchInputBtn}
                >
                    <svg data-encore-id="icon" role="img" aria-hidden="true"
                         className="Svg-sc-ytk21e-0 dYnaPI CIVozJ8XNPJ60uMN23Yg w-[16px] h-[16px]" fill={'gray'}>
                        <path
                            d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z"></path>
                    </svg>
                </button>
            </div>
            <div>
                {data && data.map((item, index)=>(
                    <Playlist key={index} data={item}/>
                ))}
            </div>
        </div>
    </div>
    );
}

export default MyPlaylist

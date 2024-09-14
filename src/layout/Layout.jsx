import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Component/Header";
import MyPlaylist from "./Component/MyPlaylist/MyPlaylist.jsx";
import PlayerControl from "./Component/Player/PlayerControl";
import PlayerPlaylist from "./Component/Player/PlayerPlaylist";
import "./Layout.style.css";
import { Footer } from "flowbite-react";
import CustomFooter from "./Component/CustomFooter.jsx";
import React from "react";

const Layout = () => {
  const [visibleSection, setVisibleSection] = useState("playlist");

  return (
    <div>
      {/* 상단 헤더 */}
      <Header />
      <div className="flex gap-1">
        {/* 왼쪽 사이드바 */}
        <MyPlaylist />
        <div className="flex flex-col w-full">
          {/* 동적으로 바뀌는 부분 */}
          <main
            className="flex-grow h-[calc(100vh-140px)] w-full min-w-[300px]
           p-3 bg-[#121212] justify-center rounded-[10px] overflow-hidden 
           hover:overflow-y-auto custom-scrollbar"
          >
            <Outlet /> {/* URL에 따라 여기에 컴포넌트가 렌더링됨 */}
            <CustomFooter />
          </main>
        </div>
        <PlayerPlaylist visibleSection={visibleSection} />
        <PlayerControl
          visibleSection={visibleSection}
          setVisibleSection={setVisibleSection}
        />
      </div>
    </div>
  );
};

export default Layout;

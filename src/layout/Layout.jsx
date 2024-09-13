import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Component/Header";
import MyPlaylist from "./Component/MyPlaylist/MyPlaylist.jsx";
import PlayerControl from "./Component/PlayerControl";
import PlayerPlaylist from "./Component/PlayerPlaylist";
import "./Layout.style.css";

const Layout = () => {
  const [visibleSection, setVisibleSection] = useState("playlist");

  return (
    <div>
      {/* 상단 헤더 */}
      <Header />
      <div className="flex">
        {/* 왼쪽 사이드바 */}
        <MyPlaylist />
        <div className="flex flex-col w-full">
          {/* 동적으로 바뀌는 부분 */}
          <main className="flex-grow">
            <Outlet /> {/* URL에 따라 여기에 컴포넌트가 렌더링됨 */}
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

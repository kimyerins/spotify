import { Outlet } from "react-router-dom";
import Header from "./Component/Header";
import MyPlaylist from "./Component/MyPlaylist/MyPlaylist.jsx";
import PlayerControl from "./Component/PlayerControl";
import './Layout.style.css'

const Layout = () => {
  return (
    <div>
      {/* 상단 헤더 */}
      <Header />
      <div className="flex">
        {/* 왼쪽 사이드바 */}
        <MyPlaylist />
        <div className="flex flex-col w-full">
          {/* 동적으로 바뀌는 부분 */}
          <main className="flex-grow flex h-[calc(100vh-140px)] w-fullmin-w-[600px]
           mx-2 p-3 bg-[#121212] justify-center rounded-[10px] overflow-hidden 
           hover:overflow-y-auto custom-scrollbar">
            <Outlet /> {/* URL에 따라 여기에 컴포넌트가 렌더링됨 */}
          </main>
        </div>
        <PlayerControl />
      </div>
    </div>
  );
};

export default Layout;

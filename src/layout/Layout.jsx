import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Header from "./Component/Header";
import MyPlaylist from "./Component/MyPlaylist/MyPlaylist.jsx";
const Layout = () => {
  return (
    <div className="bg-black">
      <Header />
      <div className={"flex"}>
        <MyPlaylist />
          <Outlet />
      </div>

    </div>
  );
};

export default Layout;

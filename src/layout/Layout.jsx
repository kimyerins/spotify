import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import MyPlaylist from "./MyPlaylist.jsx";

const Layout = () => {
  return (
    <div className={'w-[100%] columns-3'}>
        <MyPlaylist/>
        <Outlet />
    </div>
  )
}

export default Layout
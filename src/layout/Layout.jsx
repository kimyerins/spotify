import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import MyPlaylist from "./MyPlaylist.jsx";

const Layout = () => {
  return (
    <div className={'flex'}>
        <MyPlaylist/>
        <Outlet/>
    </div>
  )
}

export default Layout
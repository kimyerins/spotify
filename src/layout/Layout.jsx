import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Header from './Component/Header';
import MyPlaylist from "./Component/MyPlaylist.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import Callback from "../utils/Callback.jsx"
const Layout = () => {

  return (
    <div className='bg-black'>
      <Header/>
        <div className={'flex'}>
            <MyPlaylist/>
            <HomePage/>
            <Callback />
        </div>
      <Outlet />
    </div>
  );
};

export default Layout;

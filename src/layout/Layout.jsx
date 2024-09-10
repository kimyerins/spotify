import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Header from './Component/Header';
const Layout = () => {

  return (
    <div className='bg-black'>
      <Header/>
      <Outlet />
    </div>
  )
}

export default Layout
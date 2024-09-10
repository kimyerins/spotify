import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold bg-black text-white">Layout</h2>
      <Outlet />
    </div>
  )
}

export default Layout
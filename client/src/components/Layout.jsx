import React from 'react'
import Header from './Header'
import {Outlet} from "react-router-dom"

const Layout = () => {
  return (
    <div className="text-gray-950">
        <Header />
        <Outlet />
    </div>
  )
}

export default Layout
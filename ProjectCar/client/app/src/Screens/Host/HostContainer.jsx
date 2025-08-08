import React from 'react'
import { Outlet } from 'react-router-dom'
import HostNav from './HostNav'




function HostContainer() {
  return (
    <div>
        <HostNav></HostNav>
    <div>
        <Outlet></Outlet>
    </div>

    </div>
  )
}

export default HostContainer

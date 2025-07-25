import React from 'react'
import { Outlet } from 'react-router-dom'
import HostNav from './HostNav'




function HostContainer() {
  return (
    <div>
        
    <div>
        <HostNav></HostNav>
        <Outlet></Outlet>
    </div>

    </div>
  )
}

export default HostContainer

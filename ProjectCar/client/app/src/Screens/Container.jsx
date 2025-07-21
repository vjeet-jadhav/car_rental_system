import React from 'react'
import { Outlet } from 'react-router-dom'
import Login from '../Components/Login'

function Container() {
  return (
    <div>
      {/* navbar */}
      <Login></Login>
      <div>
      </div>

      {/* main content */}
      <div>
        <Outlet/>
      </div>

      {/* footer */}
      <div>

      </div>
    </div>

  )
}

export default Container

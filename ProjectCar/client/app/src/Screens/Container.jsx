import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../Components/LandingNavbar'
import Login from '../Components/Login.jsx'

function Container() {
  return (
    <div>
      {/* navbar */}
      {/* <Login></Login> */}
      <div>

        <Navbar />

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

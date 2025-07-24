import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'



function Container() {

  return (
    <>
      <div>
        {/* navbar */}

        <div>
          <Navbar />
        </div>

        {/* main content */}
        <div>
          <Outlet />
        </div>

        {/* footer */}
        <div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Container

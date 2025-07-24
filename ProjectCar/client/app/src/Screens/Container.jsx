import React from 'react'
import { Outlet } from 'react-router-dom'


import Footer from '../Components/Footer'
import AdminNav from './Admin/AdminNav';


function Container() {
  return (
    <div>
      
      <div>

      </div>

      {/* main content */}
      <div>
        <Outlet/>
      </div>

      {/* footer */}
      <div>
        <Footer></Footer>
      </div>
    </div>

  )
}

export default Container

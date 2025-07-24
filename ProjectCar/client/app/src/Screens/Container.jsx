import React from 'react'
import { Outlet , useLocation} from 'react-router-dom'

import Navbar from '../Components/LandingNavbar'
import Login from '../Components/Login'
import CarList from './Admin/CarList'
import AdminNav from '../Components/AdminNav'
import Profile from '../Components/Profile'

import MyCar from './Host/MyCar'


function Container() {
  
  return (
    <div style={{ position: 'relative' }}>
      <AdminNav />
      

      <Outlet />
    </div>

  )
}

export default Container
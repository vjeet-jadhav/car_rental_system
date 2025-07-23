import React from 'react'
import { Outlet , useLocation} from 'react-router-dom'

import Navbar from '../Components/Navbar'
import Login from '../Components/Login'
import CarList from './Admin/CarList'
import AdminNav from './Admin/AdminNav'
import Profile from '../Components/Profile'

import MyCar from './Host/MyCar'


function Container() {
  
  return (
    <div style={{ position: 'relative' }}>

      

      <Outlet />
    </div>

  )
}

export default Container

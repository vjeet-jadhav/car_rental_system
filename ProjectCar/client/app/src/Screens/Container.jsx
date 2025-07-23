import React from 'react'
import { Outlet , useLocation} from 'react-router-dom'

import Navbar from '../Components/Navbar'
import Login from '../Components/Login'
import CarList from './Admin/CarList'
import AdminNav from './Admin/AdminNav'
import Profile from '../Components/Profile'


function Container() {

  const location = useLocation();

  const showProfile = location.pathname === '/dashboard/edit';

  return (
    <div style={{ position: 'relative' }}>
      <Outlet />
    </div>

  )
}

export default Container

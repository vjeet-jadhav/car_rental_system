import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Login from '../../Components/Login';

function ProtectedRoutes({user}) {
  return user ? <Outlet/> : <Login/>; 
}

export default ProtectedRoutes


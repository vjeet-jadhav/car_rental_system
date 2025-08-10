import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from './Home';

function ProtectedRoutesTrip({rani}) {
  
    return rani?<Outlet/>:<Home/>;
}

export default ProtectedRoutesTrip

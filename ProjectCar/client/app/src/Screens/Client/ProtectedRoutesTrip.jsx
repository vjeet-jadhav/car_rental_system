import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from './Home';

function ProtectedRoutesTrip({trip}) {
  
    return trip?<Outlet/>:<Home/>;
}

export default ProtectedRoutesTrip

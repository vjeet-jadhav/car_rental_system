import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import AdminNav from './Admin/AdminNav';
import AgentNavbar from './Agent/AgentNavbar';



function Container() {

   const location = useLocation();
  const path = location.pathname;

  // Choose the correct navbar based on path
  const renderNavbar = () => {
    if (path.startsWith("/home")) return <Navbar />;
       if (path.startsWith("/agent")) return <AgentNavbar />;
    // if (path.startsWith("/host")) return <Navbar />;
    if (path.startsWith("/admin")) return <AdminNav></AdminNav>;
    
    return <Navbar />;
  };

  return (
    <>
      <div>

        <div>{renderNavbar()}</div>

        <div>
          <Outlet />
        </div>

        <div>
          <Footer />
        </div>
      </div>

    </>
  )
}

export default Container

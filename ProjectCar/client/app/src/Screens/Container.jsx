import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'


import Navbar from '../Components/Navbar';

import Footer from '../Components/Footer'
import AdminNav from './Admin/AdminNav';
import HostNav from './Host/HostNav';
import AgentNavbar from './Agent/AgentNavbar';


function Container() {

  const location = useLocation();
  const path = location.pathname;

  // Choose the correct navbar based on path
  const renderNavbar = () => {
    if (path.startsWith("/home")) return <Navbar />;
    if (path.startsWith("/host")) return <HostNav />;
    if (path.startsWith("/agent")) return <AgentNavbar />;
    if (path.startsWith("/admin")) return <AdminNav></AdminNav>;
    
    return <Navbar />;
  };

  return (
    < >
      <div className="d-flex flex-column min-vh-100">

        {/* <div>{renderNavbar()}</div> */}

        <div className="flex-grow-1">
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

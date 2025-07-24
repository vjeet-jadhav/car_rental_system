import React from 'react'
import { Outlet , useLocation} from 'react-router-dom'

import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import PendingRequests from './Agent/PendingRequests'
import History from './Agent/History'


function Container() {
  
  return (

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
          <Footer/>
      </div>

   
    </div>
  )
}

export default Container

import React from 'react'
import { Outlet } from 'react-router-dom'

function Container() {
  return (
    <div>
      {/* navbar */}
      <div>
        
      </div>

      {/* main content */}
      <div>
        <Outlet/>
      </div>

      {/* footer */}
      <div>

      </div>
    </div>

  )
}

export default Container

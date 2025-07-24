import React from 'react'
import { Outlet } from 'react-router-dom'
import AgentNavbar from './AgentNavbar'

function AgentContainer() {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default AgentContainer

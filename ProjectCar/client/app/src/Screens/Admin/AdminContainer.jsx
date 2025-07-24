import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNav from './AdminNav'


function AdminContainer() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  )
}

export default AdminContainer

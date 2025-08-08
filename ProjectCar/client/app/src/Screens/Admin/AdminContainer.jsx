import React from 'react'
import { Outlet } from 'react-router-dom'
import { Component } from './Component'
import AdminNav from './AdminNav'


function AdminContainer() {
  return (
    <div >
      <AdminNav></AdminNav>
      <Component></Component>
      <Outlet></Outlet>
    </div>
  )
}

export default AdminContainer

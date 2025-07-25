import React from 'react'
import { Outlet } from 'react-router-dom'
import { Component } from './Component'


function AdminContainer() {
  return (
    <div >
      <Component></Component>
      <Outlet></Outlet>
    </div>
  )
}

export default AdminContainer

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './Screens/Home/Home'
import Container from './Screens/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  
  return (
    <>
      <Routes>
        {/* Login route */}
        <Route/>
        {/* Registration route */}
        <Route/>

        {/* main content */}
        <Route
        path='/'
        element={<Container/>}
        >
          <Route
          path='/home'
          element={<Home/>}
          />
        </Route>
        
      </Routes>

        
    </>
  )
}

export default App

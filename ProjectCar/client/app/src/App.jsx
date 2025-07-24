import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'

import Container from './Screens/Container'
import Navbar from './Components/Navbar'
import Signup from './Screens/Client/Signup'
import Home from './Screens/Client/Home'
import Footer from './Components/Footer'
import CarInfo from './Screens/Client/CarInfo'
import CarBooking from './Screens/Client/CarBooking'


function App() {

  return (
    <>
      {/* <h1>hello</h1> */}
      <Routes>
        <Route
        path="/"
        element={<Container/>}
        >
          {/* here insert you page route */}
          {/* eg <Route path="/container/home" element={<Home/>} */}

          <Route
          path="/home"
          element={<Home/>}
          />

          <Route
          path="/allcars"
          element={<CarInfo/>}
          />

          <Route
          path="/carbooking"
          element={<CarBooking/>}
          />
           
        </Route>
      </Routes>
      
      {/* <Navbar/>
      <CarInfo/> */}
      {/* <Home/> */}
      {/* <Footer/> */}
    </>
  )
}

export default App

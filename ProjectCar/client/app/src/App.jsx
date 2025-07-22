import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'

import Container from './Screens/Container'
import Navbar from './Components/Navbar'
import Signup from './Screens/Client/Signup'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1>hello</h1> */}
      <Routes>

      
       
        <Route
        path="/"
        element={<Container></Container>}

        >
          {/* here insert you page route */}
          {/* eg 
          <Route path="/container/home" element={<Home/>}>
           */}
        </Route>
      </Routes>
    </>
  )
}

export default App

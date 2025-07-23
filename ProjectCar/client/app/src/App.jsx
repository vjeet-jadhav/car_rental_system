import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Container from './Screens/Container'
import CarList from './Screens/Admin/CarList'
import Profile from './Components/Profile'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Container></Container>} > 
         <Route path='/restrict' element={<CarList/>}></Route>
         <Route path="/edit" element={<Profile />} /> 
        </Route>
      </Routes>
    </>
  )
}

export default App
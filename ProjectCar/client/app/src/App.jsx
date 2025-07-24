

import { useState } from "react";
import "./App.css";
import Navbar from './Components/Navbar'
import Signup from './Screens/Client/Signup'
import Home from './Screens/Client/Home'
import Footer from './Components/Footer'
import CarInfo from './Screens/Client/CarInfo'
import CarBooking from './Screens/Client/CarBooking'
import { Routes, Route } from "react-router-dom";
import Container from "./Screens/Container";
import CarList from "./Screens/Admin/CarList";
import Profile from "./Components/Profile";
import AdminContainer from "./Screens/Admin/AdminContainer";
import ScheduleAgenet from "./Screens/Admin/ScheduleAgenet";
import RegisterAgent from "./Screens/Admin/RegisterAgent";

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Container></Container>}>
          <Route path="admin" element={<AdminContainer></AdminContainer>}>
            <Route path="restrict" element={<CarList />}></Route>
            <Route path="edit" element={<Profile />} />
            <Route path="schedule" element={<ScheduleAgenet />} />
            <Route path="register" element={<RegisterAgent></RegisterAgent>}></Route>
          </Route>
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
    </>
  );
}

export default App;

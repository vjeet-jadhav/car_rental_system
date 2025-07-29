
import { useState } from "react";
import "./App.css";
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
import PendingRequests from "./Screens/Agent/PendingRequests";
import AgentHistory from "./Screens/Agent/History";
import AgentContainer from "./Screens/Agent/AgentContainer";

import Login from "./Components/Login";
import ClientBooking from "./Screens/Client/ClientBooking";

import HostContainer from "./Screens/Host/HostContainer";
import HostRegistration from "./Screens/Host/HostRegistration";
import HostRegistrationForm from "./Screens/Host/HostRegistrationForm";
import HostHomePage from "./Screens/Host/HostHomePage";
import ClientCarReview from "./Screens/Client/ClientCarReview";
import HostCarInformation from "./Screens/Host/HostCarInformation"



function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Container></Container>}>
          <Route path="admin" element={<AdminContainer></AdminContainer>}>
            <Route path="restrict" element={<CarList />}></Route>
            <Route path="edit" element={<Profile />} />
            <Route index element={<ScheduleAgenet />} />
            <Route path="register" element={<RegisterAgent></RegisterAgent>}></Route>
          </Route>

          <Route path="host" element={<HostContainer></HostContainer>}>
            <Route path="carregistration" element={<HostRegistration></HostRegistration>}></Route>
            <Route path="registrationform" element={<HostRegistrationForm></HostRegistrationForm>}></Route>
            <Route index element={<HostHomePage></HostHomePage>}></Route>
            <Route path="carinformation" element={<HostCarInformation></HostCarInformation>}></Route>
          </Route>

          <Route path="agent" element={<AgentContainer></AgentContainer>}>
            <Route path="history" element={<AgentHistory></AgentHistory>}></Route>
            <Route path="" element={<PendingRequests></PendingRequests>}></Route>
          </Route>


          <Route path="" element={<Home/>}/>
          <Route path="allcars" element={<CarInfo />}/>
          <Route path="carbooking" element={<CarBooking />}/>
          <Route path="edit" element={<Profile />} />
          <Route path="become-host" element={<HostRegistration />}></Route>
          <Route path="become-host/registration-form" element={<HostRegistrationForm/>}></Route>
          <Route path="user-login" element={<Login />} />
          <Route path="user-signup" element={<Signup />} />
          <Route path="user-booking" element={<ClientBooking />} />
          <Route  path="review-car"  element={<ClientCarReview />} />

        </Route>

      </Routes>
    </>
  );
}

export default App;


import { createContext, useContext, useEffect, useState } from "react";

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
import HostHistory from "./Screens/Host/HostHistory";
import HostEarning from "./Screens/Host/HostEarning";
import CarRatings from "./Screens/Host/CarRatings";
import { ToastContainer } from "react-toastify";
import { UserDetails } from "./Screens/Admin/UserDetails";
import ClientContainer from "./Screens/Client/ClientContainer";
import ProtectedRoutes from "./Screens/Client/ProtectedRoutes";
import AllCars from "./Screens/Client/AllCars";
import ProtectedRoutesTrip from "./Screens/Client/ProtectedRoutesTrip";
// import ProtectedRoutesTrip from "./Screens/Client/ProtectedRoutesTrip";


export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);


  // const [rani, setRani] = useState(() => {
  //   const setRani = sessionStorage.getItem("rani");
  //   return setRani ? setRani : null;
  // });

  // console.log("trip is ", rani);

  // useEffect(() => {
  //   if (rani) {
  //     sessionStorage.setItem("trip", JSON.stringify(rani));
  //   }
  // }, [rani]);


  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);



  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Container></Container>}>
            <Route path="admin" element={user ? <AdminContainer></AdminContainer> : <ClientContainer />}>
              <Route path="restrictCar" element={<CarList />}></Route>
              <Route path="restrictUser" element={<UserDetails></UserDetails>}> </Route>
              <Route path="edit" element={<Profile />} />
              <Route index element={<ScheduleAgenet />} />
              <Route path="register" element={<RegisterAgent></RegisterAgent>}></Route>
            </Route>


            <Route path="host" element={user ? <HostContainer></HostContainer> : <Home></Home>}>
              <Route path="carregistration" element={<HostRegistration></HostRegistration>}></Route>
              <Route path="registrationform" element={<HostRegistrationForm></HostRegistrationForm>}></Route>
              <Route index element={<HostHomePage></HostHomePage>}></Route>
              <Route path="edit" element={<Profile />} />
              <Route path="carinformation" element={<HostCarInformation></HostCarInformation>}></Route>
              <Route path="history" element={<HostHistory></HostHistory>}></Route>
              <Route path="earning" element={<HostEarning></HostEarning>}></Route>
               <Route path="edit" element={<Profile />} />
              <Route path="car/feedbacks" element={<CarRatings></CarRatings>}></Route>
              <Route path="edit" element={<Profile />} />
            </Route>


            <Route path="agent" element={user ? <AgentContainer></AgentContainer> : <Home></Home>}>
              <Route path="history" element={<AgentHistory></AgentHistory>}></Route>
              <Route path="edit" element={<Profile />} />
              <Route path="" element={<PendingRequests></PendingRequests>}></Route>
            </Route>

            <Route path="" element={<ClientContainer />}>
              <Route path="" element={<Home />} />
              <Route path="user-login" element={<Login />} />
              <Route path="user-signup" element={<Signup />} />
              <Route path="all-cars" element={<AllCars />} />
              <Route path="/allcars" element={<CarInfo />} />

              {/* ON THE BASIS OF USER IS LOGIN OR NOT */}
              <Route element={<ProtectedRoutes user={user} />}>
                <Route path="edit" element={<Profile />} />
                <Route path="become-host" element={<HostRegistration />} />
                <Route path="become-host/registration-form" element={<HostRegistrationForm />} />
                <Route path="user-booking" element={<ClientBooking />} />
                <Route path="review-car" element={<ClientCarReview />} />
                <Route path="carbooking" element={<CarBooking />} />
              </Route>

            </Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
      <ToastContainer />
    </>
  );
}

export default App;

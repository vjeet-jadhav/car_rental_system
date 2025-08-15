import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from 'react';


import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from "../Services/user";
import { AuthContext } from "../App";
import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const[message,setMessage]=useState("");
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    city: ""
  });

  const onLogin = async () => {

    const { email, password } = loginInfo;
    
    if (loginInfo.email.length == 0) {
      toast.warn('Please enter the email')
    } else if (loginInfo.password.length == 0) {
      toast.warn('Please enter the password')
    } else {

      const result = await loginUser(email, password)
      if (result && result.status == 200) {
        console.log("Result from backend is ",JSON.stringify(result.data));
        sessionStorage.setItem("token", result.data);
        const decoded = jwtDecode(result.data);
        console.log("user contains " + JSON.stringify(decoded));
        setUser(decoded);
        const authorities = decoded.authorities;

        if (authorities == 'ADMIN') {
          setTimeout(() => navigate("/admin"),0);
        } else if (authorities == 'AGENT') {
          setTimeout(() => navigate("/agent"), 1000);
        } else if (authorities == 'USER') {
          setTimeout(() => { navigate("/") }, 1000);
          toast.success("Welcome, To Drivana");
        } else if (authorities == 'HOST') {
          setTimeout(() => navigate("/host"), 1000);
        }
      }
      else
      {
        setMessage("New here? Sign up now and join us!")
        toast.error("Unable to log in. Please check your email and password and try again.");
      }
    }
  }

  useEffect(()=>{

  },[message]);

  return (
    <div style={{ backgroundColor: '#fb8500' }} className="container  app-background mt-3 w-75">

      <div className="row" >

        {/* Left Section */}
        <div className="col-md-6 d-flex flex-column justify-content-center text-center text-md-start">
          <img src='/Image/login.png' width="400" style={{ width: '350px', marginLeft: '100px' }}></img>
          <h1 style={{ color: '#fff' }} className=" fw-bold my-1 text-center  ">
            <span className="ms-5" >Welcome Back User...</span>
          </h1>
        </div>

        {/* Right Section */}
        <div className="col-md-4 position-relative ">

          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>

          <div className="card t my-5">
            <div className="card-body p-5">

              <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="email">
                Email :
              </label>

              <input type="email" id='email' className="form-control mb-4" placeholder="Email" onChange={(e) =>{
                setLoginInfo({ ...loginInfo, email: e.target.value });
                setMessage("");
              }
              } />

              <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="pass">
                Password :
              </label>

              <input type="password" id='pass' className="form-control mb-4" placeholder="Password" onChange={(e) =>{
                setLoginInfo({ ...loginInfo, password: e.target.value })
                setMessage("");
              }
              } />


              {message&&<p className="text-center fst-italic text-primary">"New here? Sign up now and join us!"</p>}
              <button style={{ backgroundColor: '#fb8500', color: '#fff' }} className="btn  w-100 mb-2 fw-bold" onClick={() => onLogin(loginInfo)}>Log-In</button>
              {/* <p className="text-center" d-flex justify-content-center gap-3>or</p> */}
              <Link to="/user-signup" style={{ backgroundColor: '#fb8500', color: '#fff' }} className="btn  w-100 mb-1 fw-bold">Sign-Up</Link>


            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;

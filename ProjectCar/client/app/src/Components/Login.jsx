import { loginUser } from '../Services/user';
import {jwtDecode }from "jwt-decode";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [loginInfo , setLoginInfo] = useState({
    email :"",
    password:"",
    city:""
  });

  const onLogin = async () =>{

    
    
    console.log(loginInfo);

    const {email , password , city} = loginInfo;

    if (loginInfo.email.length == 0) {
      toast.warn('Please enter the email')
    } else if (loginInfo.password.length == 0) {
      toast.warn('Please enter the password')
    } else {
      // console.log("called login")

      const result = await loginUser(email, password, city)
      // const token = localStorage.settItem("result");
      const decoded = jwtDecode(result);
      console.log(decoded);

      const authorities = decoded.authorities;

      if (authorities == 'ADMIN') {
       
        navigate("/admin");
       
      }else if(authorities == 'AGENT'){

        navigate("/agent");
      }else if(authorities == 'USER'){

        navigate("/");
      }else if(authorities == 'HOST'){
        navigate("/host");
      }

      else {
        toast.error(result.error)
      }
    }
  }


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

              <input type="email" id='email' className="form-control mb-4" placeholder="Email" onChange={(e) =>
              setLoginInfo({ ...loginInfo, email: e.target.value })
            }/>

              <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="pass">
                Password :
              </label>

              <input type="password" id='pass' className="form-control mb-4" placeholder="Password" onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            } />

              <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="location">
                Location :
              </label>

              <select name="" id="location" className='form-control mb-4' onChange={(e) =>
              setLoginInfo({ ...loginInfo, city: e.target.value })
            }>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Sambhajinagar">Sambhajinagar</option>
              </select>
             
             
              <div className="form-check d-flex justify-content-center mb-4">
                <input className="form-check-input" type="checkbox" id="remember" />
                <label className="form-check-label ms-2 fw-bold" htmlFor="remember">
                  Remember me.
                </label>
              </div>

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

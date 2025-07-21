import React from 'react'

function Login() {
  return (
   <div className="container p-3 mt-5">
      <div className="row">

        {/* Image Column */}
        <div className="col-md-5 mt-5 d-flex justify-content-center align-items-center ">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone"
          />
          
        </div>
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <h2>Welcome Back..User</h2>
        </div>
        {/* Form Column */}
        <div className="col-md-4" style={{ border: '2px solid orange' }}>
          <div className="mb-4">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control form-control-lg" />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input type="password" className="form-control form-control-lg" />
          </div>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label" htmlFor="remember">Remember me</label>
            </div>
            <a href="#!">Forgot password?</a>
          </div>

          <button className="btn btn-primary btn-lg w-100 mb-4">Sign in</button>

          <div className="d-flex align-items-center my-4">
            <hr className="flex-grow-1" />
            <p className="mx-3 mb-0 fw-bold">OR</p>
            <hr className="flex-grow-1" />
          </div>

          <button className="btn btn-lg w-100" style={{ backgroundColor: '#55acee', color: 'white' }}>
            Register
          </button>
        </div>

      </div>
    </div>
  )
}

export default Login

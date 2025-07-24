import React from 'react'
import './Register.css'
function Register() {
  return (
    <div className="host-container" >
      {/* <header className="host-navbar">
        <div className="logo">Aapli Car</div>
        <div className="nav-buttons">
          <button>Home</button>
          <button>Profile</button>
        </div>
      </header> */}

      <div className="main-section">
        <h2>Host Your Car...</h2>

        <div className="form-card">
          <label><b>Do you have a RC Book?</b></label>
          <div className="radio-group">
            <label>
              <input type="radio" name="rcBook"  /> 
              <span> Yes</span>
            </label>
            <label>
              <input type="radio" name="rcBook"  />
              <span> No</span>
            </label>
          </div>

          <label><b>Enter Registration Number:</b></label>
          <input
            type="text"
            placeholder="MH-xx-xxxx"
          />

          <button className="continue-btn">Continue</button>
        </div>
      </div>
    </div>
  )
}

export default Register

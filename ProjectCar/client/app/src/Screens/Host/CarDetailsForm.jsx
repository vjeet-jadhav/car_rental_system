import React from 'react'
import './CarDetailsForm.css'

function CarDetailsForm() {
  return (
    <div className="container">
      <header className="navbar">
        <div className="logo">Aapli Car</div>
        <div className="nav-buttons">
          <button>Home</button>
          <button>Profile</button>
        </div>
      </header>

      <div className="content-wrapper">
        <div className="image-section">
          <img src="https://via.placeholder.com/250x300.png?text=Your+Car" alt="Car" />
        </div>

        <form className="form-section">
          <div className="input-group">
            <label>Car Number</label>
            <input type="text" placeholder="Enter Car Number" />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Car Brand</label>
              <input type="text" placeholder="Enter Car Brand" />
            </div>
            <div className="input-group">
              <label>Car Model</label>
              <input type="text" placeholder="Enter Car Model" />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Car Variant</label>
              <input type="text" placeholder="Enter Car Variant" />
            </div>
            <div className="input-group">
              <label>Year of Registration</label>
              <input type="text" placeholder="Enter Year" />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>City</label>
              <input type="text" placeholder="Enter City" />
            </div>
            <div className="input-group">
              <label>State</label>
              <input type="text" placeholder="Enter State" />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Pincode</label>
              <input type="text" placeholder="Enter Pincode" />
            </div>
            <div className="input-group">
              <label>Mobile Number</label>
              <input type="text" placeholder="Enter Mobile Number" />
            </div>
          </div>

          <div className="input-group full-width">
            <label>Address</label>
            <input type="text" placeholder="Enter Address" />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Transmission</label>
              <select>
                <option>Choose</option>
                <option>Manual</option>
                <option>Automatic</option>
              </select>
            </div>
            <div className="input-group">
              <label>Seat Capacity</label>
              <select>
                <option>Choose</option>
                <option>4</option>
                <option>5</option>
                <option>7</option>
              </select>
            </div>
            <div className="input-group">
              <label>Fuel Type</label>
              <select>
                <option>Choose</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>EV</option>
              </select>
            </div>
          </div>

          <button className="continue-btn"><b>Submit</b></button>
        </form>
      </div>
    </div>
  )
}

export default CarDetailsForm


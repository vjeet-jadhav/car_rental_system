import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function HostRegistrationForm() {

  const navigate = useNavigate();
  function onFormSubmit(){
    navigate(`/host`);
  }

  return (
    <div className="bg-white min-vh-100 py-4">
      <div className="container">
        {/* Navbar */}
        <header className="d-flex justify-content-center align-items-center bg-warning rounded px-4 py-2 mb-5">
          <div className="fs-4 fw-bold text-white">Fill Required Details</div>
        </header>

        {/* Card Wrapper */}
        <div className="card border-2 mx-auto" style={{ maxWidth: '900px', borderColor: 'orange', borderRadius: '15px' }}>
          <div className="row g-0">
            {/* Image Section */}
            <div className="col-md-4 bg-light d-flex justify-content-center align-items-center p-4">
              <img
                src="https://via.placeholder.com/250x300.png?text=Your+Car"
                alt="Car"
                className="img-fluid rounded"
              />
            </div>

            {/* Form Section */}
            <div className="col-md-8 p-4">
              <form className="row g-3">
                <div className="col-12">
                  <label className="form-label">Car Number</label>
                  <input type="text" className="form-control" placeholder="Enter Car Number" />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Car Brand</label>
                  <input type="text" className="form-control" placeholder="Enter Car Brand" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Car Model</label>
                  <input type="text" className="form-control" placeholder="Enter Car Model" />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Car Variant</label>
                  <input type="text" className="form-control" placeholder="Enter Car Variant" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Year of Registration</label>
                  <input type="text" className="form-control" placeholder="Enter Year" />
                </div>

                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input type="text" className="form-control" placeholder="Enter City" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">State</label>
                  <input type="text" className="form-control" placeholder="Enter State" />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Pincode</label>
                  <input type="text" className="form-control" placeholder="Enter Pincode" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Mobile Number</label>
                  <input type="text" className="form-control" placeholder="Enter Mobile Number" />
                </div>

                <div className="col-12">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" placeholder="Enter Address" />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Transmission</label>
                  <select className="form-select">
                    <option>Choose</option>
                    <option>Manual</option>
                    <option>Automatic</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Seat Capacity</label>
                  <select className="form-select">
                    <option>Choose</option>
                    <option>4</option>
                    <option>5</option>
                    <option>7</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Fuel Type</label>
                  <select className="form-select">
                    <option>Choose</option>
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>EV</option>
                  </select>
                </div>

                <div className="col-12 text-center mt-3">
                  <button type="submit" className="btn btn-warning px-5" onClick={onFormSubmit}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostRegistrationForm;

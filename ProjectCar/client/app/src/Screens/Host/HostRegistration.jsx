import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';

function HostRegistration() {
  const [hasRC, setHasRC] = useState(null);

  const handleRCChange = (e) => {
    setHasRC(e.target.value);
  };

  const navigate = useNavigate();
  const path = useLocation();

function processRegistration() {
  if (path.pathname.startsWith("/host")) {
    navigate(`/host/registrationform`);
  } else {
    navigate(`/become-host/registration-form`);
  }
}

  return (
    <div className="container mt-4  bg-white min-vh-100">
      {/* Main Section */}
      <div className="text-center mt-5 mb-2">
        <h2 className="mb-4">Host Your Car...</h2>

        <div
          className="card p-4 mx-auto "
          style={{ maxWidth: '400px', border: '2px solid orange', borderRadius: '15px' }}
        >
          {/* RC Book */}
          <label className="form-label fw-bold mb-4">Do you have a RC Book?</label>
          <div className="d-flex justify-content-around mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="rcBook"
                id="rcYes"
                value="yes"
                onChange={handleRCChange}
              />
              <label className="form-check-label" htmlFor="rcYes">
                Yes
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="rcBook"
                id="rcNo"
                value="no"
                onChange={handleRCChange}
              />
              <label className="form-check-label" htmlFor="rcNo">
                No
              </label>
            </div>
          </div>

          {/* Registration Number (disabled when hasRC !== 'yes') */}
          <label
            className={`form-label fw-bold ${hasRC !== 'yes' ? 'text-muted' : ''}`}
          >
            Enter Registration Number:
          </label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="MH-xx-xxxx"
            disabled={hasRC !== 'yes'}
          />

          <button className="btn btn-warning text-white fw-semibold"
           disabled={hasRC !== 'yes'} onClick={processRegistration}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default HostRegistration;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCarSide } from 'react-icons/fa';

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
    <div className="container-fluid bg-white min-vh-100 d-flex align-items-center justify-content-center">
      <div
        className="card p-5 shadow"
        style={{
          maxWidth: '500px',
          width: '100%',
          borderRadius: '20px',
          border: '2px solid orange',
          backgroundColor: 'white',
        }}
      >
       <h2 className="text-center mb-4 text-dark fw-bold">
          Host Your Car <FaCarSide className="text-warning ms-2" size={28} />
        </h2>

        {/* RC Book Question */}
        <label className="form-label fw-semibold fs-5 mb-3 text-center">
          Do you have a <span className="text-warning">RC Book</span>?
        </label>
        <div className="d-flex justify-content-center gap-4 mb-4">
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

        {/* Registration Number */}
        <label
          className={`form-label fw-semibold ${hasRC !== 'yes' ? 'text-muted' : 'text-dark'}`}
        >
          Enter Registration Number:
        </label>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="MH-xx-xxxx"
          disabled={hasRC !== 'yes'}
          style={{
            backgroundColor: hasRC !== 'yes' ? '#e9ecef' : 'white',
          }}
        />

        <button
          className="btn fw-bold text-white w-100"
          style={{
            background: hasRC === 'yes'
              ? 'linear-gradient(to right, orange, orangered)'
              : 'grey',
            border: 'none',
            cursor: hasRC === 'yes' ? 'pointer' : 'not-allowed',
          }}
          disabled={hasRC !== 'yes'}
          onClick={processRegistration}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default HostRegistration;

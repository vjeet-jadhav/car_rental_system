import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCarSide } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { verifyRc } from '../../Services/host';   


function HostRegistration() {
  const [hasRC, setHasRC] = useState(null);
  const [rcNumber, setRcNumber] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleRCChange = (e) => {
    setHasRC(e.target.value);
    if (e.target.value !== 'yes') {
      setRcNumber('');
    }
  };

  const handleInput = (e) => {
    setRcNumber(e.target.value.toUpperCase());
  };

  async function processRegistration() {
    if (hasRC !== 'yes') {
      toast.error('Please select "Yes" to proceed.');
      return;
    }

    // Correct regex with hyphens: MH-12-AB-1234
    const rcRegex = /^[A-Z]{2}\d{1,2}[A-Z]{1,2}\d{1,4}$/;
    if (!rcRegex.test(rcNumber)) {
      toast.error('Invalid RC number format. Expected format: MH12AB1234');
      return;
    }

    // Call the standalone verifyRc
    const { status, data: carDto, message } = await verifyRc(rcNumber);

    if (status === 'success') {
      // forward to registration form with pre-populated car
      const nextPath = pathname.startsWith('/host')
        ? '/host/registrationform'
        : '/become-host/registration-form';

      navigate(nextPath, { state: { car: carDto } });
    } else {
      toast.error(message);
    }
  }

  return (
    <div className="container-fluid bg-white min-vh-100 d-flex align-items-center justify-content-center">
      <ToastContainer position="top-center" />

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
        <label className="form-label fw-semibold fs-5 mb-3 text-center d-block">
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
          className={`form-label fw-semibold ${
            hasRC !== 'yes' ? 'text-muted' : 'text-dark'
          }`}
        >
          Enter Registration Number:
        </label>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="MH-12-AB-1234"
          disabled={hasRC !== 'yes'}
          value={rcNumber}
          onChange={handleInput}
          style={{
            backgroundColor: hasRC !== 'yes' ? '#e9ecef' : 'white',
            textTransform: 'uppercase',
          }}
        />

        <button
          className="btn fw-bold text-white w-100"
          style={{
            background:
              hasRC === 'yes'
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

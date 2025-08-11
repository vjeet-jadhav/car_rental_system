
import React from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../App';


function HostNav() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext)

  function onLogout() {
    sessionStorage.clear();
    setUser(null);
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
      <div className="container">
        {/* SANKET */}
        <Link className="navbar-brand me-2" to="/" >
          <img
            src="/Image/logo.svg"
            height="40"
            alt="MDB Logo"
            loading="lazy"
            style={{ marginTop: "" }}
          />
          <span> <b>Car-Rentals</b></span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarButtonsExample"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarButtonsExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">

              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <Link to="/host" className="btn btn-primary px-3 me-2" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none' }}>
              My Cars
            </Link>
            <Link to="/host/carregistration" className="btn btn-primary px-3 me-2" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none' }}>
              Register New Car
            </Link>
            <Link to="/host/earning" className="btn btn-primary px-3 me-2" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none' }}>
              Earning
            </Link>
            <Link to="/host/history" className="btn btn-primary px-3 me-2" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none' }}>
              History
            </Link>
            <Link to="/host/edit" className="btn btn-primary px-3 me-2" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none' }}>
              Edit
            </Link>

            <button type="button" className="btn btn-primary me-3" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none' }} onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>


  )
}

export default HostNav

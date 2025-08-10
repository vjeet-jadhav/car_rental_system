import React, { useContext } from 'react'
import { Link, useNavigate ,useLocation} from "react-router-dom";
import { AuthContext } from '../../App';

function AdminNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const {user, setUser} = useContext(AuthContext)
  const isActive = (path) => location.pathname === path;

  function onLogout(){
   sessionStorage.clear();
   setUser(null);
   navigate("/");
  }
  
  const buttonStyle = (path) => ({
    backgroundColor: isActive(path) ? "#fb830bff" : "rgba(248, 91, 60, 1)",
    border: "none",
    color: isActive(path) ? "#ffffffff" : "#fff"
  });
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
      <div className="container">
        <Link className="navbar-brand me-2" to="/">
          <img
            src="/Image/logo.svg"
            height="40"
            alt="Logo"
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
                {/* Dashboard */}
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <Link to="/admin" className="btn btn-primary px-3 me-2" style={buttonStyle("/admin")}>
              Schedule Agent
            </Link>
            <Link to="/admin/register" className="btn btn-primary px-3 me-2" style={buttonStyle("/admin/register")}>
              Register Agent
            </Link>
            <Link to="/admin/restrictCar" className="btn btn-primary px-3 me-2" style={buttonStyle("/admin/restrictCar")}>
              Cars 
            </Link>
            <Link to="/admin/restrictUser" className="btn btn-primary px-3 me-2" style={buttonStyle("/admin/restrictUser")}>
              Users
            </Link>
            <Link to="/admin/edit" className="btn btn-primary px-3 me-2" style={buttonStyle("/admin/edit")}>
              Edit
            </Link>
            <button type="button" className="btn btn-primary me-3" style={{backgroundColor:'rgba(248, 91, 60, 1)' , border:'none'}} onClick={() => onLogout()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
      
    
  )
}

export default AdminNav

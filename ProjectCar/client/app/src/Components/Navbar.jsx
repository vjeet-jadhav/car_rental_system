
import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../App";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const userLogout = () => {
    sessionStorage.clear();
    setUser(null);
    toast.success("Successfully logged out");
    navigate("/user-login");
  };

  const buttonStyle = (path) => ({
    backgroundColor: isActive(path) ? "#fb830bff" : "rgba(248, 91, 60, 1)",
    border: "none",
    color: isActive(path) ? "#ffffffff" : "#fff"
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container">
          <Link className="navbar-brand me-2" to="/">
            <img
              src="/Image/logo.svg"
              height="40"
              alt="MDB Logo"
              loading="lazy"
            />
            <span><b>Drivana</b></span>
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
                <Link className="nav-link" to="/"></Link>
              </li>
            </ul>

            {user == null ? (
              <div className="d-flex flex-row justify-content-between">
                <div className="d-flex align-items-center">
                  <Link
                    to="/user-login"
                    className="btn me-3"
                    style={buttonStyle("/user-login")}
                  >
                    Login
                  </Link>
                </div>
                <div className="d-flex align-items-center">
                  <Link
                    to="/all-cars"
                    className="btn me-3"
                    style={buttonStyle("/all-cars")}
                  >
                    All Cars
                  </Link>
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <Link
                  to="/user-booking"
                  className="btn px-3 me-2"
                  style={buttonStyle("/user-booking")}
                >
                  My Booking
                </Link>
                <Link
                  to="/become-host"
                  className="btn px-3 me-2"
                  style={buttonStyle("/become-host")}
                >
                  Host A Car
                </Link>
                <Link
                  to="/edit"
                  className="btn px-3 me-2"
                  style={buttonStyle("/edit")}
                >
                  Edit
                </Link>
                <button
                  className="btn me-3"
                  style={buttonStyle("/user-login")}
                  onClick={userLogout}
                >
                  Logout
                </button>
                <div className="d-flex align-items-center">
                  <Link
                    to="/all-cars"
                    className="btn me-3"
                    style={buttonStyle("/all-cars")}
                  >
                    All Cars
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
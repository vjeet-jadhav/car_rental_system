import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../App"

function Navbar() {

    const navigate = useNavigate();
    const { user,setUser } = useContext(AuthContext);

    // LOGOUT NAVIGATE TO USERLOGIN WITH CHANGE IN STATE OF USER
    const userLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate("/user-login");
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container">
                    <Link className="navbar-brand me-2" to="/">
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

                        {user == null ?
                            <div className="d-flex align-items-center">
                                <Link to="/user-login" className="btn btn-primary me-3" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none' }}>
                                    Login
                                </Link>
                            </div> :
                            <div className="d-flex align-items-center">
                                <Link to="/favourite" className="px-3 me-2" style={{ fontSize: '20px', color: 'rgba(248, 91, 60, 1)' }} >
                                    <i class="bi bi-heart"></i>
                                </Link>
                                <Link to="/user-booking" className="btn btn-primary px-3 me-2" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none' }}>
                                    My Booking
                                </Link>
                                <Link to="/become-host" className="btn btn-primary px-3 me-2" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none' }}>
                                    Become A Host
                                </Link>
                                <Link to="/edit" className="btn btn-primary px-3 me-2" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none' }}>
                                    Edit
                                </Link>
                                <button className="btn btn-primary me-3" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none' }}
                                    onClick={userLogout}>
                                    Logout
                                </button>
                            </div>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar

import React, { useContext } from 'react'

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../App';

function AgentNavbar() {
    const navigate = useNavigate();

    const { user, setUser } = useContext(AuthContext)

    function onLogout() {
        sessionStorage.clear();
        setUser(null);
        navigate("/");
    }


    return (
        <div>
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
                                    {/* Dashboard */}
                                </Link>
                            </li>
                        </ul>

                        <div className="d-flex align-items-center">
                            <Link to="/agent/history" className="btn btn-primary px-3 me-2" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none' }}>
                                History
                            </Link>
                            <Link to="/agent" className="btn btn-primary px-3 me-2" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none' }}>
                                Pending Requests
                            </Link>
                            <Link to="/agent/edit" className="btn btn-primary px-3 me-2" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none' }}>
                                Profile
                            </Link>

                            <Link to="/user-login" className="btn btn-primary me-3" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none' }} onClick={onLogout}>
                                LogOut
                            </Link>

                        </div >
                    </div >
                </div >
            </nav >
        </div >
    )
}

export default AgentNavbar

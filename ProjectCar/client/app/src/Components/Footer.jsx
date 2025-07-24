import React from 'react'
import "./Footer.css"
function Footer() {
    return (
        <div>
            <footer>
                <div
                    className="d-flex mt-5 py-3 rounded justify-content-between align-items-center px-3 px-lg-5 flex-wrap w-100"
                    style={{ backgroundColor: 'salmon',position:'relative',bottom:'0px',left:'0px' }}
                >
                    {/* Brand Name */}
                    <div>
                        <h1 className="m-0" style={{cursor: 'pointer'}}>CarServices</h1>
                    </div>

                    {/* Social Icons */}
                    <div className="d-flex justify-content-around gap-4 mt-3 mt-lg-0">
                        <i className="bi bi-instagram footer-icon" style={{ fontSize: '1.5rem', cursor: 'pointer' }}></i>
                        <i className="bi bi-facebook footer-icon" style={{ fontSize: '1.5rem', cursor: 'pointer' }}></i>
                        <i className="bi bi-twitter footer-icon" style={{ fontSize: '1.5rem', cursor: 'pointer' }}></i>
                    </div>

                    {/* Copyright */}
                    <div className="text-center mt-3 w-100">
                        <small>© {new Date().getFullYear()} CarServices. All rights reserved.</small>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer

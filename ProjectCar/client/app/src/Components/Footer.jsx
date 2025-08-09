import React from 'react'
import "./Footer.css"
function Footer() {
    return (
        <div>
            <footer>
                <div
                    className="d-flex mt-5 py-3 rounded justify-content-between align-items-center px-3 px-lg-5 flex-wrap w-100 bg-body-tertiary "
                    style={{ borderTop: '2px solid rgba(248, 91, 60, 1)' }}     >
                    {/* Brand Name */}
                    <div>
                        <h1 className="m-0" style={{cursor: 'pointer'}}>Drivana</h1>
                    </div>

                    {/* Social Icons */}
                    <div className="d-flex justify-content-around gap-4 mt-3 mt-lg-0 " style={{backgroundColor:'rgba(248, 91, 60, 1)' , color:'white' , padding :'1'}}>
                        <i className="bi bi-instagram footer-icon p-2" style={{ fontSize: '1.5rem', cursor: 'pointer' }}></i>
                        <i className="bi bi-facebook footer-icon p-2" style={{ fontSize: '1.5rem', cursor: 'pointer' }}></i>
                        <i className="bi bi-twitter footer-icon p-2" style={{ fontSize: '1.5rem', cursor: 'pointer' }}></i>
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

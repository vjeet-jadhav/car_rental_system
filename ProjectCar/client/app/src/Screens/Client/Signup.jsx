import "../../assets/Signup.css";
import { Link } from 'react-router-dom';


function Signup() {
  return (
    <div
      className="container app-background  w-50 p-1 mt-3"
      style={{ backgroundColor: "#fb8500" }}
    >

      <h1 style={{ color: "#fff" }} className=" fw-bold my-2 text-center  ">
        <span className="ms-5">Register here...</span>
      </h1>

     <div className="card t my-4 mx-5 mb-5 ">
        <div className="py-5 px-5">

            <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="firstname" >First Name:</label>
                  <input type="text" id="firstname" className="form-control mb-4" placeholder="First Name"/>
                </div>
                <div className="col-6 mb-3">
                   <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="lastname" >Last Name:</label>
                   <input type="text" id="lastname" className="form-control mb-4" placeholder="Last Name"/>
                </div>
            </div>

            <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="email">  Email:</label>
                  <input   type="email"   id="email" className="form-control mb-4" placeholder="Email" />
                </div>
                <div className="col-6 mb-3">
                   <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="mobno" >Mob No:</label>
                   <input type="tel" id="mobno" className="form-control mb-4" placeholder="Mob No."/>
                </div>
            </div>

            <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="pass"> Password :</label>
                  <input type="password" id='pass' className="form-control mb-4" placeholder="Password" />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="confpass">  Confirm Password :</label>
                  <input type="password" id='confpass' className="form-control mb-4" placeholder="Confirm Password" />
                </div>
            </div>

            <div className="row">
                <div className="col-6 ">
                  <Link to="/user-login" style={{ backgroundColor: '#fb8500', color: '#fff' }} className="btn  w-100  fw-bold">Sign-In</Link>
                </div>
                <div className="col-6 ">
                 <Link to="/user-signup" style={{ backgroundColor: '#fb8500', color: '#fff' }} className="btn  w-100 fw-bold">Sign-Up</Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

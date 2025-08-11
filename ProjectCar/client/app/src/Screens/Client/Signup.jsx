import { useState } from "react";
import "../../assets/Signup.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userSignUp } from "../../Services/user";

function Signup() {

  const [signInInfo, setSignInInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    city: "",
    state: "",
    zipCode: "",
    mob_num: "",
    licenseNumber: "",
    dateOfBirth:""
  });

  const navigate = useNavigate();

  const handleSignIn = async () => {
    console.log(signInInfo);

    if (!signInInfo.firstName.trim()) {
      toast.warn("First Name is required");
    } else if (signInInfo.firstName.length < 2 || signInInfo.firstName.length > 20) {
      toast.warn("First Name must be between 5 and 20 characters");
    }
    else if (!signInInfo.lastName.trim()) {
      toast.warn("Last Name is required");
    } else if (signInInfo.lastName.length < 2 || signInInfo.lastName.length > 20) {
      toast.warn("Last Name must be between 5 and 20 characters");
    }
    else if (!signInInfo.email.trim()) {
      toast.warn("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInInfo.email)) {
      toast.warn("Invalid email format");
    }
    else if (!signInInfo.password) {
      toast.warn("Password is required");
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[#@$*]).{5,20}/.test(signInInfo.password)) {
      toast.warn("Password must be 5–20 characters and include a digit, lowercase letter, and special character");
    }

    else if (!signInInfo.confirmpassword) {
      toast.warn("Confirm Password is required");
    } else if (signInInfo.password !== signInInfo.confirmpassword) {
      toast.warn("Passwords do not match");
    }

    else if (!signInInfo.city.trim()) {
      toast.warn("City is required");
    }

    else if (!signInInfo.state.trim()) {
      toast.warn("State is required");
    }

    else if (!signInInfo.zipCode) {
      toast.warn("Zip Code is required");
    } else if (signInInfo.zipCode < 100000 || signInInfo.zipCode > 999999) {
      toast.warn("Zip Code must be a 6-digit number");
    }

    else if (!signInInfo.mob_num.trim()) {
      toast.warn("Mobile Number is required");
    } else if (!/^\d{10}$/.test(signInInfo.mob_num)) {
      toast.warn("Mobile Number must be exactly 10 digits");
    }
    else if(!signInInfo.licenseNumber.trim())
    {
      toast.warn("License Number is required");
    }else if(!/^[A-Z]{2}-\d{2}-\d{4}-\d{6,7}$/.test(signInInfo.licenseNumber.trim()))
    {
      toast.warn("Not a valid format of license");
    }else if(!signInInfo.dateOfBirth)
    {
      toast.warn("Please Enter DOB");
    }
    else {

      const result = await userSignUp(signInInfo);
      console.log(JSON.stringify(result.data.message));
      console.log(JSON.stringify(result.data.statusCode));
      console.log(JSON.stringify(result.data));


       if(result && result.data.statusCode === 400)
      {
        toast.success(result.data.message);
      }else if (result && result.status === 201) {
        toast.success("Regestration successfully...)");
        navigate("/user-login");
      }
      else {
        console.log("Error is comming");
        toast.warn("Duplicate Email Found, try with another email.:)");
      }
    }


  };






  return (
    <div className="mt-5">
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
                <input type="text" id="firstname" className="form-control mb-4" placeholder="First Name"
                  onChange={(e) => setSignInInfo({ ...signInInfo, firstName: e.target.value })} />
              </div>
              <div className="col-6 mb-3">
                <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="lastname" >Last Name:</label>
                <input type="text" id="lastname" className="form-control mb-4" placeholder="Last Name"
                  onChange={(e) => setSignInInfo({ ...signInInfo, lastName: e.target.value })} />
              </div>
            </div>

            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="email">  Email:</label>
                <input type="email" id="email" className="form-control mb-4" placeholder="Email"
                  onChange={(e) => setSignInInfo({ ...signInInfo, email: e.target.value })} />
              </div>
              <div className="col-6 mb-3">
                <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="mobno" >Mob No:</label>
                <input type="tel" id="mobno" className="form-control mb-4" placeholder="Mob No."
                  onChange={(e) => setSignInInfo({ ...signInInfo, mob_num: e.target.value })} />
              </div>
            </div>

            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="pass"> Password :</label>
                <input type="password" id='pass' className="form-control mb-4" placeholder="Password"
                  onChange={(e) => setSignInInfo({ ...signInInfo, password: e.target.value })} />
              </div>
              <div className="col-6 mb-3">
                <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="confpass">  Confirm Password :</label>
                <input type="password" id='confpass' className="form-control mb-4" placeholder="Confirm Password"
                  onChange={(e) => setSignInInfo({ ...signInInfo, confirmpassword: e.target.value })} />
              </div>
            </div>

            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="city"> City :</label>
                <input type="text" id='city' className="form-control mb-4" placeholder="City"
                  onChange={(e) => setSignInInfo({ ...signInInfo, city: e.target.value })} />
              </div>
              <div className="col-6 mb-3">
                <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="state">  State :</label>
                <input type="text" id='state' className="form-control mb-4" placeholder="State"
                  onChange={(e) => setSignInInfo({ ...signInInfo, state: e.target.value })} />
              </div>
            </div>

            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="zip"> ZipCode :</label>
                <input type="number" id='zip' className="form-control mb-4" placeholder="zipcode"
                  onChange={(e) => setSignInInfo({ ...signInInfo, zipCode: e.target.value })} />
              </div>
              <div className="col-6 mb-3">
                <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="zip"> License :</label>
                <input
                  type="text"
                  id="lic"
                  className="form-control mb-4"
                  placeholder="MH-XX-XXXX-XXXXX"
                  required
                  pattern="^[A-Z]{2}-\\d{2}-\\d{4}-\\d{6,7}$"
                  title="Enter license in format: XX-00-YYYY-XXXXXX"
                  onChange={(e) => setSignInInfo({ ...signInInfo, licenseNumber: e.target.value.toUpperCase() })}
                  style={{ textTransform: "uppercase" }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-check-label ms-2 mb-3 fw-bold" htmlFor="dob"> Bade Of Birth :</label>
                <input type="date" id='dob' className="form-control mb-4" required
                  onChange={(e) => setSignInInfo({ ...signInInfo, dateOfBirth: e.target.value })} />
              </div>
            </div>

            <div className="row">
              <div className="col-6 ">
                <button style={{ backgroundColor: '#fb8500', color: '#fff' }} className="btn  w-100  fw-bold"
                  onClick={handleSignIn}>Sign-In</button>
              </div>
              <div className="col-6 ">
                <Link to="/user-login" style={{ backgroundColor: '#fb8500', color: '#fff' }} className="btn  w-100 fw-bold">Login</Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { agentSignup } from '../../Services/admin';

function RegisterAgent() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    city: "",
    state: "",
    zipCode: "",
    mob_num: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitted Data:", formData);
    const result = await agentSignup(formData);
    // console.log(result)
    if(result.status == 201){
      toast.success("Agent Added Successfully !");
      navigate("/admin");
    }else{
      toast.error("Agent Registration Failed !")
    }
  };


  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      city: "",
      state: "",
      zipCode: "",
      mob_num: "",
      email: "",
    });

    navigate(-1); 
  };
  return (
    <div className="container my-5 p-4 rounded shadow" style={{ backgroundColor: "#fff", maxWidth: "400px" }}>
      <h3 className="mb-4"><b>Agent Registration </b></h3>
      <hr></hr>
      <form onSubmit={handleSubmit} className='p-3 '>
        <div className="mb-4">
          <label className="form-label">Full Name *</label>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Address *</label>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control mb-2"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control mb-2"
                name="zipCode"
                placeholder="ZipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 row ">
          <div className="col">
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              className="form-control"
              name="mob_num"
              placeholder="000-000-0000"
              value={formData.mob_num}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label className="form-label">E-mail *</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="abc@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-4 row ">
          <div className="col">
            <label className="form-label">Password *</label>
            <input
              type="text"
              className="form-control"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label className="form-label">Confirm Password *</label>
            <input
              type="text"
              className="form-control"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="d-flex justify-content-center justify-content-evenly ">
          <button type="button" className="btn btn-secondary me-2 w-25" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary w-25" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none' }}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default RegisterAgent

import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function RegisterAgent() {

    const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

 const navigate = useNavigate();

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      street: "",
      street2: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
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
          <input
            type="text"
            className="form-control mb-2"
            name="street"
            placeholder="Address Line 1"
            value={formData.street}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="form-control mb-2"
            name="street2"
            placeholder="Address Line 2"
            value={formData.street2}
            onChange={handleChange}
          />
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
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            name="zip"
            placeholder="Postal Code"
            value={formData.zip}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 row ">
          <div className="col">
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              placeholder="000-000-0000"
              value={formData.phone}
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

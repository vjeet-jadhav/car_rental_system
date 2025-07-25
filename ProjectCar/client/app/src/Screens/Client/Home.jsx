import React from 'react'
import './Home.css'
import { Link, useNavigate } from 'react-router-dom';
function Home() {

  const navigate = useNavigate();

  const NavigateOnCars = () => {
    navigate('/allcars')
  }

  return (
    <div>
      {/* hero section div1*/}
      <div className="container mt-5 home-hero-section">
        {/* <h1 className="mb-4">Welcome to Home Section</h1> */}

        <div className="row p-4 d-flex align-items-center ">
          {/* Left section - Form */}
          <div className="col-md-4 ">
            <form>
              <div className="border rounded p-3 home-serach-div">
                <h3 className="mb-3">
                  Book Self-Drive Cars In
                  <select className="form-select mt-2" name="city" id="city">
                    <option value="pune">Pune</option>
                    <option value="mumbai">Mumbai</option>
                  </select>
                </h3>

                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location</label>
                  <select className="form-select mt-2" name="location" id="city">
                    <option value="pune">Hinjiwadi</option>
                    <option value="mumbai">Shivajinagar</option>
                  </select>
                </div>


                <div className='d-flex justify-content-center align-items-center'>
                  <button className='btn btn-success home-btn-serach' onClick={NavigateOnCars}>Serach</button>
                </div>
              </div>
            </form>
          </div>

          {/* Right section - Image */}
          <div className="col-md-7 d-flex align-items-center justify-content-center">
            <img
              src="../public/Image/car-hero-section.svg"
              alt="Car Rental"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>

      {/* trending cars div2*/}

      <div className='container mt-5 border-2 border p-5' >
        <h2 className='text-center'>Top cars</h2>
        <div className='d-flex justify-content-evenly mt-5'>
          {/* cards */}

          <Link to="carbooking" className="card cursor-pointer mb-4 shadow-sm col-md-3 scale-up text-decoration-none" >
            <img
              src="/Image/carBg1.jpg" // Corrected path for React
              className=""
              alt="Car"
               style={{height:'70%'}}
            />

            <div className="card-body" style={{height:'20%'}}>
              <h5 className="card-title mb-2">Model: TATA</h5>

              <div className="d-flex justify-content-between text-muted small mb-2">
                <div>
                  <span>Manual</span> | <span>Petrol</span> | <span>7 seats</span>
                </div>
                <div>
                  <span>4.5⭐</span>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <span className="text-success">Delivery Available</span>
                <span className="fw-bold">₹196/hr</span>
              </div>
            </div>
          </Link>

          <Link to="carbooking" className="card cursor-pointer mb-4 shadow-sm col-md-3 scale-up text-decoration-none" >
            <img
              src="/Image/carBg2.jpg" // Corrected path for React
              className=""
              alt="Car"
              style={{height:'70%'}}
            />

            <div className="card-body " style={{height:'20%'}}>
              <h5 className="card-title mb-2">Model: TATA</h5>

              <div className="d-flex justify-content-between text-muted small mb-2">
                <div>
                  <span>Manual</span> | <span>Petrol</span> | <span>7 seats</span>
                </div>
                <div>
                  <span>4.5⭐</span>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <span className="text-success">Delivery Available</span>
                <span className="fw-bold">₹196/hr</span>
              </div>
            </div>
          </Link>

          <Link to="carbooking" className="card cursor-pointer mb-4 shadow-sm col-md-3 scale-up text-decoration-none" >
            <img
              src="/Image/carBg3.jpg" // Corrected path for React
              className=""
              alt="Car"
              style={{height:'70%'}}
            />

            <div className="card-body" style={{height:'20%'}}>
              <h5 className="card-title mb-2">Model: TATA</h5>

              <div className="d-flex justify-content-between text-muted small mb-2">
                <div>
                  <span>Manual</span> | <span>Petrol</span> | <span>7 seats</span>
                </div>
                <div>
                  <span>4.5⭐</span>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <span className="text-success">Delivery Available</span>
                <span className="fw-bold">₹196/hr</span>
              </div>
            </div>
          </Link>

        </div>

        <div className="d-flex justify-content-center align-content-center">
          <Link to="/allcars" className="fw-bold fs-5 btn btn-success" style={{backgroundColor:'rgba(248, 91, 60, 1)' , border:'none'}}>
            Browse All Cars
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Home

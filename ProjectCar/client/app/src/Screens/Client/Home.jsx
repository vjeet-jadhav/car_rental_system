import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getAllCarCities, getAvailableCars, getFeedbacksForHome, getTopCars } from '../../Services/user';

import Navbar from '../../Components/Navbar';
import { AuthContext } from '../../App';

function Home() {

  const navigate = useNavigate();



  const [getTripInfo, setTrioInfo] = useState(
    {
      startTrip: "",
      endTrip: "",
    }
  );

  // For the User 
  const [getCity, setCity] = useState([]);

  const [getTopcCars, setTopCars] = useState([]);

  const [city, setOnlyCity] = useState("");

  const [getFeedback, setFeedback] = useState([]);

  // for adding buffer time
  function formatLocalDateTime(date) {
    const pad = (num) => num.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const getAllCity = async () => {
    const result = await getAllCarCities();
    if (result.status === 200) {
      setCity(result.data);
    }
    else {
      console.log("something goes wrong....getAllCities");
    }
  }

  const topCars = async () => {
    const result = await getTopCars();
    if (result && result.status == 200) {
      setTopCars(result.data);
    }
    else {
      console.log("get all cars problem");
    }
  }

  const NavigateOnCars = async () => {
    console.log(getTripInfo);

    const { startTrip, endTrip } = getTripInfo;



    // ADDING BUFFER TIME TO AVOID SERVER SIDE VALIDATION
    let dateObj = new Date(startTrip);
    dateObj = new Date(dateObj.getTime() + 2 * 60 * 1000);

    const adjStartTrip = formatLocalDateTime(dateObj);

    setTrioInfo({ ...getTripInfo, startTrip: adjStartTrip })
    // console.log(adjStartTrip+"adding buffer time");


    if (startTrip.length == 0)
      toast.warn("Select Start Trip time");
    else if (endTrip.length == 0)
      toast.warn("Select End Trip time");
    else if (new Date(startTrip) >= new Date(endTrip)) {
      toast.warn("End Trip time must be after Start Trip time");
    } else if (!city) {
      toast.warn("select city");
    }
    else {

      const result = await getAvailableCars(getTripInfo);
      if (result && result.status == 200) {
        navigate('/allcars', {
          state: {
            "data": result.data,
            "tripInfo": getTripInfo,
            "city": city
          }
        })
      }
      else {
        toast.error("You are not selecting proper journey time (Must be present or future)");
        console.log("something goes wrong....");
      }

    }

  }

  const getTopFeedbacks = async () => {
    const result = await getFeedbacksForHome();
    if (result && result.status == 200) {
      // console.log(JSON.stringify(result.data));
      setFeedback(result.data);
    }
  }

  useEffect(() => {
    getAllCity();
    topCars();
    getTopFeedbacks();
  }, []);

  return (
    <div >
      <div>
        {/* hero section div1*/}

        <div className="container mt-5 home-hero-section">
          {/* <h1 className="mb-4">Welcome to Home Section</h1> */}

          <div className="row p-4 d-flex align-items-center ">
            {/* Left section - Form */}
            <div className="col-md-4 px-2 py-3">
              <div className="border rounded p-3 home-serach-div">
                <h3 className="mb-3">
                  Book Self-Drive Cars In
                </h3>
                {/* New datetime inputs for startTrip and endTrip */}
                <div className="mb-3">
                  <label htmlFor="startTrip" className="form-label">Start Trip</label>
                  <input
                    type="datetime-local"
                    id="startTrip"
                    name="startTrip"
                    className="form-control"
                    required
                    onChange={(e) => setTrioInfo({ ...getTripInfo, startTrip: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="endTrip" className="form-label">End Trip</label>
                  <input
                    type="datetime-local"
                    id="endTrip"
                    name="endTrip"
                    className="form-control"
                    required
                    onChange={(e) => setTrioInfo({ ...getTripInfo, endTrip: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label text-secondary mb-1">Select Area</label>
                  <select id="city" className="form-select"
                    required
                    value={city}
                    onChange={(e) => setOnlyCity(e.target.value)}
                  >
                    <option value="">Select City</option>
                    {getCity.map((city, index) => {
                      return <>
                        <option key={index} value={city}>{city}</option>
                      </>
                    })}
                  </select>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                  <button className="btn btn-primary px-3 me-2 fw-bold" style={{ backgroundColor: 'rgba(248, 91, 60, 1)', border: 'none', width: "200px" }} onClick={NavigateOnCars}>Search</button>
                </div>
              </div>
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

        <div className='container mt-5  p-5' >
          <div className="bg-light p-4 rounded shadow-sm">
            <h2 className='text-center'>Top cars</h2>

            {/* TOP CARS */}
            <div className="col-12 border-danger">
              <div className="row justify-content-evenly mt-5">
                {
                  getTopcCars.map((car, index) => (
                    <div key={index} className="col-md-4 mb-4">
                      <div
                        className="card cursor-pointer shadow-sm scale-up text-decoration-none"
                        onClick={() => navigateToBookingCar(car)}
                      >
                        <img
                          src={car.imagelist?.[0]?.imgUrl || '/Image/car-hero-section.svg'}
                          alt="Car"
                          className="card-img-top"
                          style={{ height: "70%" }}
                        />
                        <div className="card-body" style={{ height: "20%" }}>
                          <div className='d-flex justify-content-between'>
                            <h5 className="card-title mb-2">{car.brand} : {car.carModel}</h5>
                            <span className="fw-bold">₹{car.dailyRate}/hr</span>
                          </div>
                          <div className="d-flex justify-content-between text-muted small mb-2">
                            <div>
                              <span>{car.transmissionType}</span> | <span>{car.fuelType}</span> |{" "}
                              <span>{car.seatCapacity} seats</span>
                            </div>
                            <div>
                              <span>{car.rating}⭐</span>
                            </div>
                          </div>

                          <div className="d-flex justify-content-between">
                            <span className="text-success">{car.status} :--</span>
                            <span >{car.serviceArea}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="d-flex justify-content-center align-content-center">
              <Link to="/all-cars" className="btn btn-link text-decoration-none fw-medium" onClick={() => navigate("/allcars")} style={{ color: 'rgba(248, 91, 60, 1)' }}>
                Browse All Cars
                <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className='container mt-5  p-5'>
          <div className="bg-light p-4 rounded shadow-sm">
            <div className=' d-flex justify-content-center align-items-center '>
              {/* <div className='bg-info col-5' style={{ height: '2px' }}></div> */}
              <h3 className='fw-bold py-1 px-2 mx-0.5 rounded-3'>How It Works</h3>
              {/* <div className='bg-info col-5' style={{ height: '2px' }}></div> */}
            </div>

            <div className='d-flex justify-content-evenly mt-5 flex-row gap-3'>

              <div className='col-2.5 rounded-3 p-2 home-work-track border bg-white'>
                <div className='text-center fw-bold rounded-circle text-white' style={{ backgroundColor: 'rgb(251, 85, 25)', width: '25px', height: '25px' }}>1</div>
                <img src="/Image/searchSvg.svg" alt="work flow" />
                <h5 className='text-center  text-success '>Search a car</h5>
                <p style={{ fontSize: '10px' }} className='text-center opacity-75'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, praesentium!</p>
              </div>


              <div className='col-2.5 rounded-3 p-2 home-work-track border bg-white'>
                <div className='text-center fw-bold rounded-circle text-white' style={{ backgroundColor: 'rgb(251, 85, 25)', width: '25px', height: '25px' }}>2</div>
                <img src="/Image/bookSvg.svg" alt="work flow" />
                <h5 className='text-center  text-success '>Book Car</h5>
                <p style={{ fontSize: '10px' }} className='text-center opacity-75'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, praesentium!</p>
              </div>


              <div className='col-2.5 rounded-3 p-2 home-work-track border bg-white' >
                <div className='text-center fw-bold rounded-circle text-white' style={{ backgroundColor: 'rgb(251, 85, 25)', width: '25px', height: '25px' }}>3</div>
                <img src="/Image/bookSvg.svg" alt="work flow" />
                <h5 className='text-center  text-success '>Make Payment</h5>
                <p style={{ fontSize: '10px' }} className='text-center opacity-75'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, praesentium!</p>

              </div>

              <div className='col-2.5 rounded-3 p-2 home-work-track border bg-white'>
                <div className='text-center fw-bold rounded-circle text-white' style={{ backgroundColor: 'rgb(251, 85, 25)', width: '25px', height: '25px' }}>4</div>
                <img src="/Image/driveSvg.svg" alt="work flow" />
                <h5 className='text-center  text-success '>Enjoy Drive</h5>
                <p style={{ fontSize: '10px' }} className='text-center opacity-75'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, praesentium!</p>

              </div>

              <div className='col-2.5 rounded-3 p-2 home-work-track border bg-white'>
                <div className='text-center fw-bold rounded-circle text-white' style={{ backgroundColor: 'rgb(251, 85, 25)', width: '25px', height: '25px' }}>5</div>
                <img src="/Image/reviewSvg.svg" alt="work flow" />
                <h5 className='text-center  text-success '>Rate Drive</h5>
                <p style={{ fontSize: '10px' }} className='text-center opacity-75'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, praesentium!</p>

              </div>
            </div>


          </div>
        </div>

        {/* feedback */}
        <div className='container mt-5  p-5'>
          <div className="bg-light p-4 rounded shadow-sm">
            <h2 className="h4 fw-bold mb-4 text-center">Top Feedback</h2>
            <div className="row gy-4">
              {getFeedback.map((feedback, index) => (
                <div className="col-12 col-md-6 col-lg-4" key={index}>
                  <div className="bg-white p-3 rounded border shadow-sm hover-shadow transition">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center">
                        <div className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center me-2" style={{ width: '40px', height: '40px' }}>
                          {feedback.firstNmae.charAt(0)}
                        </div>
                        <h5 className="mb-0 fw-medium">{feedback.firstNmae} {feedback.lastName}</h5>
                      </div>
                    </div>
                    <div className="mb-2 fw-bold" style={{ color: "rgba(248, 91, 60, 1)", fontSize: "20px" }}>
                      <span>{feedback.rating}⭐</span>
                    </div>
                    <div className="mb-2 ">
                      <h5 className="mb-0 fw-medium">{feedback.carBrand} : {feedback.carModel}</h5>

                    </div>
                    <div className=' p-1'>
                      <p className="text-muted mb-0">{feedback.feedback}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="mt-4 text-center">
              <button className="btn btn-link text-decoration-none fw-medium" style={{ color: 'rgba(248, 91, 60, 1)' }}>
                View All Feedback
                <i className="bi bi-arrow-right ms-1"></i>
              </button>
            </div> */}
          </div>
        </div>

        {/* contact us */}
        <div className='d-flex container w-100 justify-content-center align-items-center mt-5'>
          {/* google map */}
          <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3901381.8747824263!2d75.01073565274407!3d18.93309678846613!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcfc41e9c9cd6f9%3A0x1b2f22924be04fb6!2sMaharashtra%2C%20India!5e0!3m2!1sen!2snl!4v1753431340427!5m2!1sen!2snl" style={{ width: "500px", height: "350px", style: "border:0;", allowfullscreen: "", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade" }} className='rounded-3'></iframe>
          </div>
          {/* form */}
          <div className='w-100'>
            <div
              className="container p-4 rounded shadow-sm bg-light"
              style={{
                maxWidth: "600px",
                border: "1px solid rgba(248, 91, 60, 1)"
              }}
            >
              <h4 className="mb-4 text-center">Contact Us</h4>

              <p>If you have any queries, feel free to reach out to us:</p>

              <ul className="list-unstyled">
                <li><strong>Phone:</strong> +1 234 567 8900</li>
                <li><strong>Email:</strong> support@example.com</li>
                <li><strong>Address:</strong> 123 Main Street, City, Country</li>
              </ul>

              <p>We’re here to help you 24/7. Thank you!</p>
            </div>
          </div>


        </div>

      </div>
    </div>

  )
}

export default Home

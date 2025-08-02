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
          <div className="col-md-4 px-2 py-3">
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

      <div className='container mt-5  p-5' >
        <div className="bg-light p-4 rounded shadow-sm">
          <h2 className='text-center'>Top cars</h2>
          <div className="d-flex justify-content-evenly mt-5">
                      {/* cards */}
          
                      <Link
                        to="carbooking"
                        className="card cursor-pointer mb-4 shadow-sm col-md-3 scale-up text-decoration-none "
                      >
                        <img
                          src="/Image/carBg1.jpg" // Corrected path for React
                          className=""
                          alt="Car"
                          style={{ height: "70%" }}
                        />
          
                        <div className="card-body" style={{ height: "20%" }}>
                          <h5 className="card-title mb-2">Model: TATA</h5>
          
                          <div className="d-flex justify-content-between text-muted small mb-2">
                            <div>
                              <span>Manual</span> | <span>Petrol</span> |{" "}
                              <span>7 seats</span>
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
          
                      <Link
                        to="carbooking"
                        className="card cursor-pointer mb-4 shadow-sm col-md-3 scale-up text-decoration-none"
                      >
                        <img
                          src="/Image/carBg2.jpg" // Corrected path for React
                          className=""
                          alt="Car"
                          style={{ height: "70%" }}
                        />
          
                        <div className="card-body " style={{ height: "20%" }}>
                          <h5 className="card-title mb-2">Model: TATA</h5>
          
                          <div className="d-flex justify-content-between text-muted small mb-2">
                            <div>
                              <span>Manual</span> | <span>Petrol</span> |{" "}
                              <span>7 seats</span>
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
          
                      <Link
                        to="carbooking"
                        className="card cursor-pointer mb-4 shadow-sm col-md-3 scale-up text-decoration-none"
                      >
                        <img
                          src="/Image/carBg3.jpg" // Corrected path for React
                          className=""
                          alt="Car"
                          style={{ height: "70%" }}
                        />
          
                        <div className="card-body" style={{ height: "20%" }}>
                          <h5 className="card-title mb-2">Model: TATA</h5>
          
                          <div className="d-flex justify-content-between text-muted small mb-2">
                            <div>
                              <span>Manual</span> | <span>Petrol</span> |{" "}
                              <span>7 seats</span>
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
            <button className="btn btn-link text-decoration-none fw-medium" onClick={() => navigate("/allcars")} style={{ color: 'rgba(248, 91, 60, 1)' }}>
              Browse All Cars
              <i className="bi bi-arrow-right ms-1"></i>
            </button>
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
          <h2 className="h4 fw-bold mb-4 text-center">Recent Feedback</h2>
          <div className="row gy-4">
            {[
              {
                name: "Jane Cooper",
                rating: 5,
                comment:
                  "Excellent service! The product arrived earlier than expected and was exactly what I needed.",
                date: "2 days ago",
              },
              {
                name: "Michael Johnson",
                rating: 4,
                comment:
                  "Great quality products and responsive customer service team. Would recommend!",
                date: "1 week ago",
              },
              {
                name: "Emily Davis",
                rating: 5,
                comment:
                  "I've been a customer for years and the quality never disappoints. Love the new features!",
                date: "2 weeks ago",
              },
            ].map((feedback, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div className="bg-white p-3 rounded border shadow-sm hover-shadow transition">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center me-2" style={{ width: '40px', height: '40px' }}>
                        {feedback.name.charAt(0)}
                      </div>
                      <h5 className="mb-0 fw-medium">{feedback.name}</h5>
                    </div>
                    <span className="text-muted small">{feedback.date}</span>
                  </div>
                  <div className="mb-2 text-warning">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        className={`bi ${star <= feedback.rating ? "bi-star-fill" : "bi-star"} me-1`}
                        key={star}
                      ></i>
                    ))}
                  </div>
                  <p className="text-muted mb-0">{feedback.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="btn btn-link text-decoration-none fw-medium" style={{ color: 'rgba(248, 91, 60, 1)' }}>
              View All Feedback
              <i className="bi bi-arrow-right ms-1"></i>
            </button>
          </div>
        </div>
      </div>

      {/* contact us */}
      <div className='d-flex container w-100 justify-content-center align-items-center mt-5'>
        {/* google map */}
        <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3901381.8747824263!2d75.01073565274407!3d18.93309678846613!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcfc41e9c9cd6f9%3A0x1b2f22924be04fb6!2sMaharashtra%2C%20India!5e0!3m2!1sen!2snl!4v1753431340427!5m2!1sen!2snl" style={{ width: "600px", height: "450px", style: "border:0;", allowfullscreen: "", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade" }} className='rounded-3'></iframe>
        </div>
        {/* form */}
        <div className='w-100'>
          <form className="container p-4 border rounded shadow-sm bg-light" style={{ maxWidth: "600px" }}>
            <h4 className="mb-4 text-center">Contact Us</h4>

            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
            </div>

            {/* Title */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Subject / Title</label>
              <input type="text" className="form-control" id="title" placeholder="What's this about?" required />
            </div>

            {/* Message */}
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control" id="message" rows="4" placeholder="Write your message here..." required></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn  text-white fw-semibold" style={{ backgroundColor: 'rgb(251, 85, 25)' }}>Send Message</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Home

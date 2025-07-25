import React from "react";
import "./CarInfo.css";
import { Link } from "react-router-dom";
function CarInfo() {
  return (
    <div>
      {/* top section */}
      <div className="d-flex mt-5  p-2 gap-1">
        {/* left-section */}
        <div className="col-3 border border-2 border-danger">
          <div>
            <h3 className="text-center p-2">Find Your Perfect Ride</h3>
          </div>
        </div>
        {/* rigth-section */}
        <div className="col-9 border border-2 border-danger">
          <div>
            <h3 className="text-center p-2">Applied filter will be shown</h3>
          </div>
        </div>
      </div>
      {/* middle section */}
      <div className="d-flex mt-2 p-2 gap-1">
        {/* left-section */}
        <div className="col-3  border-danger p-3 ">
          <form action="">
            {/* car type */}
            <div className="px-3 py-2 mt-2 border mx-2 rounded">
              <h5>Filter By Car Type</h5>
              <div className="d-flex flex-column gap-3 px-3 mt-3">
                <div>
                  <input type="checkbox" style={{ transform: "scale(1.3)" }} />{" "}
                  <span className=" px-2">SUV</span>
                </div>
                <div>
                  <input type="checkbox" style={{ transform: "scale(1.3)" }} />{" "}
                  <span className=" px-2">Tata Nexon</span>
                </div>
                <div>
                  <input type="checkbox" style={{ transform: "scale(1.3)" }} />{" "}
                  <span className=" px-2">Hyundai i20</span>
                </div>
                <div>
                  <input type="checkbox" style={{ transform: "scale(1.3)" }} />{" "}
                  <span className=" px-2">Mahindra XUV700</span>
                </div>
              </div>
            </div>

            {/* Transmission */}
            <div className="px-3 py-2 mt-2 border mx-2 rounded">
              <h5>Filter By Transmission</h5>
              <div className="d-flex flex-column gap-3 px-3 mt-3">
                <div>
                  <input type="checkbox" style={{ transform: "scale(1.3)" }} />{" "}
                  <span className=" px-2">Manual</span>
                </div>
                <div>
                  <input type="checkbox" style={{ transform: "scale(1.3)" }} />{" "}
                  <span className=" px-2">Automatic</span>
                </div>
              </div>
            </div>

            {/* Fuel Type */}
            <div className="px-3 py-2 mt-2 border mx-2 rounded">
              <h5>Filter By Fuel Type</h5>
              <div className="d-flex flex-column gap-3 px-3 mt-3">
                <div>
                  <input type="checkbox" style={{ transform: "scale(1.3)" }} />{" "}
                  <span className=" px-2">Petrol</span>
                </div>
                <div>
                  <input type="checkbox" style={{ transform: "scale(1.3)" }} />{" "}
                  <span className=" px-2">Diesel</span>
                </div>
                <div>
                  <input type="checkbox" style={{ transform: "scale(1.3)" }} />{" "}
                  <span className=" px-2">Electric</span>
                </div>
              </div>
            </div>

            {/* Seats */}
            <div className="px-3 py-2 mt-2 border mx-2 rounded">
              <h5>Filter By Seats</h5>
              <div className="d-flex flex-column gap-3 px-3 mt-3">
                <div>
                  <input type="checkbox" style={{ transform: "scale(1.3)" }} />{" "}
                  <span className=" px-2">4/5 Seaters</span>
                </div>
                <div>
                  <input type="checkbox" style={{ transform: "scale(1.3)" }} />{" "}
                  <span className=" px-2">6/7 Seaters</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="px-3 py-2 mt-2 border mx-2 rounded">
              <h5>Filter By Rating</h5>
              <div className="d-flex flex-column gap-3 px-3 mt-3">
                <div>
                  <input type="radio" style={{ transform: "scale(1.3)" }} />{" "}
                  <span className=" px-2">4.5+ Rated</span>
                </div>
                <div>
                  <input type="radio" style={{ transform: "scale(1.3)" }} />{" "}
                  <span className=" px-2">4.0+ Rated</span>
                </div>
                <div>
                  <input type="radio" style={{ transform: "scale(1.3)" }} />{" "}
                  <span className=" px-2">3.5+ Rated</span>
                </div>
                <div>
                  <input type="radio" style={{ transform: "scale(1.3)" }} />{" "}
                  <span className=" px-2">All</span>
                </div>
              </div>
            </div>

            {/* Submit button or apply filter */}
            <div className="px-3 py-2 mt-2 border mx-2 d-flex justify-content-center align-content-center">
              <input
                type="submit"
                value="Apply Filter"
                className="btn btn-success fw-bold"
              />
            </div>
          </form>
        </div>

        {/* rigth-section */}

        <div className="col-9  border-danger">
          <div className="d-flex justify-content-evenly mt-5">
            {/* cards */}

            <Link
              to="carbooking"
              className="card cursor-pointer mb-4 shadow-sm col-md-3 scale-up text-decoration-none"
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
        </div>
      </div>
    </div>
  );
}

export default CarInfo;

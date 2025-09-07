import React, { useContext, useEffect, useState } from "react";
import "./CarInfo.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCarsAfterFilter, getServiceAreaJS } from '../../Services/user';
import { AuthContext } from "../../App";

function CarInfo() {


  const location = useLocation();
  const navigate = useNavigate();
  // const{setRani} = useContext(AuthContext);
  // derefference the content of previous component
  let { data = [], tripInfo = {}, city = "" } = location.state || {};
  // console.log(data);
  // console.log(tripInfo);
  // console.log(city);

  // GET THE ALL SERVICES FROM PARTICULAR CITY
  const [getServiceArea, setServiceArea] = useState([]);

  // STORE FILTER DATA 
  const [carData, setCarData] = useState(data);

  // GET ALL THE FILTERS
  const [getFilters, setFilters] = useState({
    serviceArea: "",
    rating: 0.0,
    seatCapacity: [],
    transmissionType: [],
    fuelType: []
  });

  // CREATING ARRAY FOR FILTERS
  const transmission = ["MANUAL", "AUTOMATIC"];
  const fuel = ["PETROL", "DIESEL", "ELECTRICAL", "CNG"]
  const capacity = ["4", "5", "6", "7"];
  const rate = [3.0, 3.5, 4.0, 4.5];
  const getAllServiceArea = async () => {
    const result = await getServiceAreaJS(city);
    if (result.status === 200) {
      setServiceArea(result.data);
    }
  }

  useEffect(() => {
    getAllServiceArea();
  }, [])


  useEffect(() => {
  }, [carData]);


  // FUNCTION TO STORE THE VALUE IN THE ARRAY FROM THE CHECKED BOXES
  const handleCheckboxChange = (event, filterKey) => {
    const { value, checked } = event.target;
    setFilters((prevFilters) => {
      const updatedArray = checked
        ? [...prevFilters[filterKey], value]
        : prevFilters[filterKey].filter((item) => item !== value);

      return {
        ...prevFilters,
        [filterKey]: updatedArray,
      };
    });
  };


  // AFTER FILTER INCOMING NEW DATA
  const getAllTheFilters = async () => {
    console.log("All filterts");
    console.log(getFilters);
    const result = await getCarsAfterFilter(getFilters, tripInfo);
    if (result.status === 200) {
      setCarData(result.data);
    }
  }

  // NAVIGATE TO BOOKING CAR
  const navigateToBookingCar = (car) => {
    // For New Booking
    sessionStorage.removeItem("paymentDone");
    console.log(car);
    // sessionStorage.setItem("rani",JSON.stringify(car));
    
    navigate("/carbooking", {
      state: {
        "carInfo": car,
        "tripData": tripInfo,
        "getCity": city
      }
    });
  }



  return (
    <div >
      {/* top section */}
      <div className="d-flex mt-5  p-2 gap-1">
        {/* left-section */}
        <div className="col-3 d-flex align-items-center justify-content-center">
          <div>
            <h3 className="text-center p-2">Find Your Perfect Ride</h3>
          </div>
        </div>
        {/* rigth-section */}
        {/* updated by sanket-main */}
        <div className="col-9 p-3">
          <div className="d-flex justify-content-around" style={{ margin: "0px 200px" }}>
            <div className="mb-3">
              <label htmlFor="startTime" className="form-label fw-bold">Start Time</label>
              <input
                type="datetime-local"
                id="startTime"
                className="form-control"
                value={tripInfo.startTrip}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startTime" className="form-label fw-bold">City</label>
              <input
                type="text"
                id="startTime"
                className="form-control"
                value={city}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label htmlFor="endTime" className="form-label fw-bold">End Time</label>
              <input
                type="datetime-local"
                id="endTime"
                className="form-control"
                value={tripInfo.endTrip}
                readOnly
              />
            </div>
          </div>
          <div className="d-flex justify-content-center p-1 ">
            <Link to="/" className="fw-bold text-decoration-none border rounded-3 p-1" style={{ color: 'white', backgroundColor: "rgba(248, 91, 60, 1)" }}><i className="bi bi-arrow-left ms-1"></i> Home Select Journey</Link>
          </div>
        </div>

      </div>

      {/* middle section */}
      <div className="d-flex  p-2 gap-1">
        {/* left-section */}
        <div className="col-3  border-danger p-3 ">
          <div>

            {/* Select Service area */}
            <div className="px-3 py-2 mt-2 border mx-2 rounded">
              <h5>Filter By Transmission</h5>
              <div className="d-flex flex-column gap-3 px-3 mt-3">
                <div>
                  <label htmlFor="serviceArea" className="form-label text-secondary mb-1">Select Area</label>
                  <select id="serviceArea" className="form-select"
                    onChange={(e) => setFilters({ ...getFilters, serviceArea: e.target.value })}
                  >
                    <option value="">Service Area</option>
                    {getServiceArea.map((area, index) => {
                      return <>
                        <option key={index} value={area}>{area}</option>
                      </>
                    })}
                  </select>
                </div>
              </div>
            </div>



            {/* Transmission */}

            <div className="px-3 py-2 mt-2 border mx-2 rounded">
              <h5>Filter By Transmission</h5>
              <div className="d-flex flex-column gap-3 px-3 mt-3">
                {transmission.map((type) => (
                  <div key={type}>
                    <input
                      type="checkbox"
                      value={type}
                      checked={getFilters.transmissionType.includes(type)}
                      onChange={(e) => handleCheckboxChange(e, "transmissionType")}
                      style={{ transform: "scale(1.3)" }}
                    />
                    <span className="px-2">{type}</span>
                  </div>
                ))}
              </div>
            </div>


            {/* Fuel Type */}

            <div className="px-3 py-2 mt-2 border mx-2 rounded">
              <h5>Filter By Fuel Type</h5>
              <div className="d-flex flex-column gap-3 px-3 mt-3">
                {fuel.map((fuel) => (
                  <div key={fuel}>
                    <input
                      type="checkbox"
                      value={fuel}
                      checked={getFilters.fuelType.includes(fuel)}
                      onChange={(e) => handleCheckboxChange(e, "fuelType")}
                      style={{ transform: "scale(1.3)" }}
                    />
                    <span className="px-2">{fuel}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seats */}

            <div className="px-3 py-2 mt-2 border mx-2 rounded">
              <h5>Filter By Seats</h5>
              <div className="d-flex flex-column gap-3 px-3 mt-3">
                {capacity.map((seat) => (
                  <div key={seat}>
                    <input
                      type="checkbox"
                      value={seat}
                      checked={getFilters.seatCapacity.includes(seat)}
                      onChange={(e) => handleCheckboxChange(e, "seatCapacity")}
                      style={{ transform: "scale(1.3)" }}
                    />
                    <span className="px-2">{seat}</span>
                  </div>
                ))}
              </div>
            </div>


            {/* Rating */}
            <div className="px-3 py-2 mt-2 border mx-2 rounded">
              <h5>Filter By Transmission</h5>
              <div className="d-flex flex-column gap-3 px-3 mt-3">
                <div>
                  <label htmlFor="rating" className="form-label text-secondary mb-1">Select Area</label>
                  <select id="rating" className="form-select"
                    onChange={(e) => setFilters({ ...getFilters, rating: e.target.value })}
                  >
                    <option value="">Rating</option>
                    {rate.map((rate, index) => {
                      return <>
                        <option key={index} value={rate}>{rate}</option>
                      </>
                    })}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit button or apply filter */}
            <div className="px-3 py-2 mt-2 border mx-2 d-flex justify-content-center align-content-center">
              <button
                type="submit"
                value="Apply Filter"
                className="btn btn-success fw-bold"
                onClick={getAllTheFilters}
              >Apply</button>
            </div>
          </div>
        </div>

        {/* rigth-section */}

        {/* rendering data from privious component */}
        <div className="col-9 border-danger">
          <div className="row justify-content-evenly mt-5">
            {
              carData.length === 0
                ?
                <div className="alert alert-warning text-center mt-4" role="alert">
                  <h4 className="alert-heading">No Cars Available</h4>
                  <p>Currently, cars are not available for your selected trip time zone. To continue, please adjust the time and try again.</p>
                </div>
                :
                carData.map((car, index) => (
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

      </div>
    </div >
  );
}

export default CarInfo;

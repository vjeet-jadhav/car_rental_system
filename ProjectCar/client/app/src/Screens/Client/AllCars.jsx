import React, { useEffect, useState } from 'react'
import { getAllCarsForBrowse } from '../../Services/user';

function AllCars() {

    const [getCars, setCars] = useState([]);

    const getAllCars = async () => {
        const result = await getAllCarsForBrowse();
        if (result && result.status == 200) {
            console.log("cars", JSON.stringify(result.data));
            setCars(result.data);
        }
    }

    useEffect(() => {
        getAllCars();
    }, []);
    return (
        <div >
            <div className="container mt-2 p-5">
                <h1 className='text-center p-3' style={{ color: "rgba(248, 91, 60, 1)" }}>Available cars on website</h1>
                <div className="row">
                    {(!getCars) ? (
                        <div className="text-center p-5">
                            <div className="spinner-border text-danger" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : getCars.map((car, index) => (
                        <div key={index} className="col-12 col-md-4 mb-4  ">
                            {/* Car Card */}
                            <div className="card shadow-sm scale-up text-decoration-none">
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
                                        <span className="text-success">{car.status} AT :--</span>
                                        <span>{car.serviceArea}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default AllCars

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function CarBooking() {

    const location = useLocation();
    const { carInfo, tripData, getCity } = location.state || {};
    console.log("Car:", carInfo);
    console.log("Trip Info:", tripData);
    console.log("City:", getCity);

    return (
        <div>
            <div className=' d-flex flex-row gap-3 m-4'>

                {/* Proceed for payment */}
                <div className="my-4 p-4 col-4 border rounded-4">
                    <h3>Car Rental Payment</h3>

                    <div className="d-flex flex-column gap-3" style={{ maxWidth: '450px' }}>
                        <div>
                            <label>Check-In</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={tripData.startTrip}
                                readOnly
                            />
                        </div>

                        <div>
                            <label>Check-Out</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={tripData.endTrip}
                                readOnly
                            />
                        </div>

                        <div>
                            <label>Rate per Hour (₹)</label>
                            <input
                                type="number"
                                className="form-control"
                                min="1"
                                value={carInfo.dailyRate}
                                readOnly
                            />
                        </div>



                        {/* Summary Display */}

                        <div className="alert alert-info">
                            <p>Total Hours: <strong></strong></p>
                            <p>Amount Before Discount: ₹<strong></strong></p>
                            <p>Final Amount: ₹<strong></strong></p>
                        </div>


                        <button type="submit" className="btn btn-success" >
                            Pay ₹
                        </button>
                    </div>
                </div>

                {/* car information */}
                <div className='my-4 col-8 p-4'>
                    <div className='d-flex justify-content-evenly align-content-center '>
                        {/* Main Image */}
                        <div>
                            <img src="/Image/carBg1.jpg" alt="" className='border border-2 rounded-4' style={{ width: '400px', height: '410px' }} />
                        </div>

                        {/* Image Thumbnails and Car Info */}
                        <div className='d-flex flex-column gap-3'>

                            {/* Thumbnails */}
                            <div className='d-flex flex-row gap-2'>
                                <img src="/Image/carBg1.jpg" alt="" style={{ maxWidth: '200px', height: '200px' }} className='rounded-4 border border-2' />
                                <img src="/Image/carBg1.jpg" alt="" style={{ maxWidth: '200px', height: '200px' }} className='rounded-4 border border-2' />
                            </div>
                            <div className='d-flex flex-row gap-2'>
                                <img src="/Image/carBg1.jpg" alt="" style={{ maxWidth: '200px', height: '200px' }} className='rounded-4 border border-2' />
                                <img src="/Image/carBg1.jpg" alt="" style={{ maxWidth: '200px', height: '200px' }} className='rounded-4 border border-2' />
                            </div>



                        </div>
                    </div>

                    <div className='d-flex justify-content-between align-items-center mt-4 p-4'>
                        <div className='d-flex flex-column gap-3'>
                            <span>Hosted By : {carInfo.firstName} {carInfo.lastName}</span>
                            <span className='fw-bold' style={{ fontSize: '2rem' }}>{carInfo.brand} : {carInfo.carModel}</span>
                            <div className='opacity-75'>
                                <span>{carInfo.transmissionType}</span> | <span>{carInfo.fuelType}</span> |{" "}
                                <span>{carInfo.seatCapacity} seats</span>


                            </div>

                        </div>
                        <div className='d-flex flex-column align-items-center p-2 m-2'>
                            <div>
                                <span className='fw-bold' style={{ fontSize: '2rem' }}>{carInfo.rating}⭐</span>
                            </div>
                            <br/>
                            <div className='px-3 py-1'>
                                <pre>
                                    <span className='fw-bold'>Location</span><br/>
                                    {carInfo.address}
                                </pre>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default CarBooking


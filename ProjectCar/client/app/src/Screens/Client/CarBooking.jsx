import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PaymentButton from '../../Components/PaymentButton';
import { AuthContext } from '../../App';

function CarBooking() {

    const { user, serUser } = useContext(AuthContext);
    const location = useLocation();
    const { carInfo, tripData, getCity } = location.state || {};

    console.log("Car:", carInfo);
    console.log("Trip Info:", tripData);
    console.log("City:", getCity);

    // Calculate total hours (rounding up)
    const start = new Date(tripData.startTrip);
    const end = new Date(tripData.endTrip);
    const diffMs = end - start;
    const totalHours = Math.ceil(diffMs / (1000 * 60 * 60));

    // Calculate amounts
    const amountBeforeDiscount = totalHours * carInfo.dailyRate;

    const finalAmount = amountBeforeDiscount;

    const forCreateOrder = {
        "startTrip": tripData.startTrip,
        "endTrip": tripData.endTrip,
        "rate": carInfo.dailyRate,
    }

    const body = {
        "startTrip": tripData.startTrip,
        "endTrip": tripData.endTrip,
        "amount": finalAmount,
        "client": user.id,
        "car": carInfo.carId,
        "host": carInfo.hostId
    }

    // NOT ABLE TO CAME BACK BY BROWSER ARROW
    useEffect(() => {
        const isPaymentDone = sessionStorage.getItem("paymentDone");
        if (isPaymentDone === "true") {
            toast.info("You’ve already completed your booking.");
            navigate("/user-booking", { replace: true });
        }
    }, []);


    return (
        <div >
            <div className=' d-flex flex-row gap-3 m-4'>

                {/* Proceed for payment */}
                <div className="my-4 p-4 col-4 border rounded-4">
                    <div className='d-flex justify-content-between my-3'>
                        <h3>Drivana Payment</h3>
                        <div className="d-flex justify-content-center p-1 ">
                            <Link to="/" className="fw-bold text-decoration-none  rounded-2 p-1" style={{ color: 'white', backgroundColor: "rgba(248, 91, 60, 1)" }}><i className="bi bi-arrow-left ms-1"></i> Home Select Journey</Link>
                        </div>
                    </div>

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
                        {
                            (user == null) ?
                                <Link to="/user-login" className="btn fw-bold text-white" style={{ backgroundColor: 'rgba(248, 91, 60, 1)' }}>
                                    Login
                                </Link> :
                                <>
                                    <div className="alert alert-info">
                                        <p>Total Hours: <strong>{totalHours}</strong></p>
                                        <p>Final Amount: ₹<strong>{finalAmount}</strong></p>
                                    </div>
                                    <PaymentButton amt={forCreateOrder} booking={body} />
                                </>
                        }

                    </div>
                </div>

                {/* car information */}
                <div className='my-4 col-8 p-4'>
                    <div className='d-flex justify-content-evenly align-content-center '>
                        {/* Main Image */}
                        <div>
                            <img src={carInfo.imagelist?.[0]?.imgUrl || '/Image/car-hero-section.svg'} alt="" className='border border-2 rounded-4' style={{ width: '400px', height: '410px' }} />
                        </div>

                        {/* Image Thumbnails and Car Info */}
                        <div className='d-flex flex-column gap-3'>

                            {/* Thumbnails */}
                            <div className='d-flex flex-row gap-2'>
                                <img src={carInfo.imagelist?.[1]?.imgUrl || '/Image/car-hero-section.svg'} alt="" style={{ maxWidth: '200px', height: '200px' }} className='rounded-4 border border-2' />
                                <img src={carInfo.imagelist?.[2]?.imgUrl || '/Image/car-hero-section.svg'} alt="" style={{ maxWidth: '200px', height: '200px' }} className='rounded-4 border border-2' />
                            </div>
                            <div className='d-flex flex-row gap-2'>
                                <img src={carInfo.imagelist?.[3]?.imgUrl || '/Image/car-hero-section.svg'} alt="" style={{ maxWidth: '200px', height: '200px' }} className='rounded-4 border border-2' />
                                <img src={carInfo.imagelist?.[4]?.imgUrl || '/Image/car-hero-section.svg'} alt="" style={{ maxWidth: '200px', height: '200px' }} className='rounded-4 border border-2' />
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
                            <br />
                            <div className='px-3 py-1'>
                                <pre>
                                    <span className='fw-bold'>Location</span><br />
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


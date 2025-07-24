import React, { useState } from 'react';

function CarBooking() {


    return (
        <div>
            <div className=' d-flex flex-row gap-3 m-4'>

                {/* Proceed for payment */}
                <div className="my-4 p-4 col-4 border border-4">
                    <h3>Car Rental Payment</h3>

                    <form className="d-flex flex-column gap-3" style={{ maxWidth: '450px' }}>
                        <div>
                            <label>Check-In</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                required
                            />
                        </div>

                        <div>
                            <label>Check-Out</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                required
                            />
                        </div>

                        <div>
                            <label>Rate per Hour (₹)</label>
                            <input
                                type="number"
                                className="form-control"
                                min="1"
                                required
                                readOnly
                            />
                        </div>

                        <div>
                            <label>Discount (%)</label>
                            <input
                                type="number"
                                className="form-control"
                                min="0"
                                max="100"
                                readOnly
                            />
                        </div>

                        {/* Summary Display */}

                        <div className="alert alert-info">
                            <p>Total Hours: <strong></strong></p>
                            <p>Amount Before Discount: ₹<strong></strong></p>
                            <p>Discount: ₹<strong></strong></p>
                            <p>Final Amount: ₹<strong></strong></p>
                        </div>


                        <button type="submit" className="btn btn-success" >
                            Pay ₹
                        </button>
                    </form>
                </div>

                {/* car information */}
                <div className='my-4 col-8 border border-4 p-4'>
                    <div className='d-flex justify-content-evenly align-content-center border border-info'>
                        {/* Main Image */}
                        <div>
                            <img src="../public/Image/car-hero-section.svg" alt="" className='border border-2 rounded-4' style={{ width: '400px', height: '410px' }} />
                        </div>

                        {/* Image Thumbnails and Car Info */}
                        <div className='d-flex flex-column gap-3'>

                            {/* Thumbnails */}
                            <div className='d-flex flex-row gap-2'>
                                <img src="../public/Image/car-hero-section.svg" alt="" style={{ maxWidth: '200px', height: '200px' }} className='rounded-4 border border-2' />
                                <img src="../public/Image/car-hero-section.svg" alt="" style={{ maxWidth: '200px', height: '200px' }} className='rounded-4 border border-2' />
                            </div>
                            <div className='d-flex flex-row gap-2'>
                                <img src="../public/Image/car-hero-section.svg" alt="" style={{ maxWidth: '200px', height: '200px' }} className='rounded-4 border border-2' />
                                <img src="../public/Image/car-hero-section.svg" alt="" style={{ maxWidth: '200px', height: '200px' }} className='rounded-4 border border-2' />
                            </div>

                            

                        </div>
                    </div>

                    <div className='d-flex justify-content-between align-items-center mt-4'>
                        <div className='d-flex flex-column gap-3'>
                            <span>Hosted By Sanket Padul</span>
                            <span className='fw-bold' style={{fontSize:'2rem'}}>Maruti Suzuki</span>
                            <div className='opacity-75'>
                                <span>Manual</span> | <span>CNG</span> | <span>6 seats</span>
                            </div>

                        </div>
                        <div>
                            <span className='fw-bold' style={{fontSize:'2rem'}}>4.5⭐</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CarBooking


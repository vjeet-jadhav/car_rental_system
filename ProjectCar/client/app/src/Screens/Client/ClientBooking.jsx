import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
function ClientBooking() {
    
    const getUserBooking = async ()=>{
        const result = await getBooking();
        if(result && result.status==200)
        {
            
        }
        else
        {
            console.log("something goes wrong...");
        }
    }

    useEffect(()=>{

    },[]);
    return (
        <div>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Car Booking Details</h2>
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Owner</th>
                            <th>Car</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Total Hours</th>
                            <th>Rate/Hour</th>
                            <th>Total Amount</th>
                            <th>Booking Status</th>
                            <th>Payment Status</th>
                            <th>Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={booking.BookingID}>
                                <td>{index + 1}</td>
                                <td>{booking.UserName}</td>
                                <td>{booking.CarModel}</td>
                                <td>{booking.StartDateTime}</td>
                                <td>{booking.EndDateTime}</td>
                                <td>{booking.TotalHours}</td>
                                <td>₹{booking.HourlyRate}</td>
                                <td>₹{booking.TotalAmount}</td>
                                <td>
                                    <span className={`badge bg-${getStatusColor(booking.BookingStatus)} btn`} style={{Width:'200px'}}>
                                        {booking.BookingStatus}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge bg-${getStatusColor(booking.PaymentStatus)} btn `} style={{Width:'200px'}}>
                                        {booking.PaymentStatus}
                                    </span>
                                </td>
                                <td>
                                    <Link to="/review-car" className="text-decoration-none fw-medium">
                                        Review
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ClientBooking

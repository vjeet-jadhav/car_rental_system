import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
// import { getBooking } from '../../Services/user';
import { getBooking } from '../../Services/user';
function ClientBooking() {

    const [bookings, setBookings] = useState([]);
    const getUserBooking = async () => {
        const result = await getBooking();
        if (result && result.status == 200) {
            console.log(JSON.stringify(result.data));
            setBookings(result.data);
        }
        else {
            console.log("something goes wrong...");
        }
    }



    useEffect(() => {
        getUserBooking();
    }, []);
    return (
        <div>
            <div className=" mt-5 mx-2">
                <h2 className="text-center mb-4">Car Booking Details</h2>
                <table className="table table-bordered table-hover">
                    <thead >
                        <tr>
                            <th>#</th>
                            <th>Owner</th>
                            <th>Car</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Booking Date</th>
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
                                <td>{booking.firstName} {booking.lastName}</td>
                                <td>{booking.brand} {booking.carModel}</td>
                                <td>{booking.startTrip}</td>
                                <td>{booking.endTrip}</td>
                                <td>{booking.bookingDate}</td>
                                <td>{booking.totalAmount/booking.dailyRate}</td>
                                <td>₹{booking.dailyRate}</td>
                                <td>₹{booking.totalAmount}</td>
                                <td>
                                    <span style={{ Width: '200px',color:"green" }}>
                                        {booking.bookingStatus}
                                    </span>
                                </td>
                                <td>
                                    <span style={{ Width: '200px',color:"green" }}>
                                        {booking.paymentStatus}
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

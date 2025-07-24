import React from 'react'

function ClientBooking() {
    const bookings = [
        {
            BookingID: 1,
            UserName: 'Sanket Padul',
            CarModel: 'TATA Nexon',
            StartDateTime: '2025-07-24 10:00',
            EndDateTime: '2025-07-24 14:00',
            TotalHours: 4,
            HourlyRate: 250,
            Discount: 100,
            TotalAmount: 900,
            BookingStatus: 'Confirmed',
            PaymentStatus: 'Paid',
        },
        {
            BookingID: 2,
            UserName: 'Riya Sharma',
            CarModel: 'Hyundai i20',
            StartDateTime: '2025-07-25 09:00',
            EndDateTime: '2025-07-25 13:00',
            TotalHours: 4,
            HourlyRate: 300,
            Discount: 0,
            TotalAmount: 1200,
            BookingStatus: 'Pending',
            PaymentStatus: 'Pending',
        },
        // Add more bookings here...
    ];

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'confirmed': return 'success';
            case 'pending': return 'warning';
            case 'cancelled': return 'danger';
            case 'completed': return 'secondary';
            case 'paid': return 'primary';
            case 'refunded': return 'info';
            default: return 'light';
        }
    };

    return (
        <div>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Car Booking Details</h2>
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Car</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Total Hours</th>
                            <th>Rate/Hour</th>
                            <th>Total Amount</th>
                            <th>Booking Status</th>
                            <th>Payment Status</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ClientBooking

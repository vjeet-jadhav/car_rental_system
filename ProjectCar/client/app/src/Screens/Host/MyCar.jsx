import React from 'react'
import './MyCar.css'

const cars = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Camry',
    number: 'MH-12-3456',
    status: 'Available',
    imageUrl: 'https://via.placeholder.com/300x200?text=Car+1',
  },
  {
    id: 2,
    brand: 'Honda',
    model: 'City',
    number: 'MH-14-7890',
    status: 'Rented',
    imageUrl: 'https://via.placeholder.com/300x200?text=Car+2',
  }
];

function MyCar() {
  return (
    <div className="booking-page">
      <header className="navbar">
        <div className="logo">Aapli Car</div>
        <nav className="nav-links">
          <a href="#">Earning</a>
          <a href="#">History</a>
          <a href="#">Home</a>
          <a href="#">Profile</a>
        </nav>
      </header>

      <h2 className="page-title">My Cars</h2>

      <div className="car-list">
        {cars.map(car => (
          <div key={car.id} className="car-box">
            <div className="car-box-content">
              <div className="car-image">
                <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} />
                <button className="view-btn">View Car Details</button>
              </div>
              <div className="car-details">
                <div className="detail-item">
                  <label>Car Brand</label>
                  <span>{car.brand}</span>
                </div>
                <div className="detail-item">
                  <label>Car Model</label>
                  <span>{car.model}</span>
                </div>
                <div className="detail-item">
                  <label>Car Number</label>
                  <span>{car.number}</span>
                </div>
                <div className="detail-item">
                  <label>Rental Status</label>
                  <span>{car.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyCar

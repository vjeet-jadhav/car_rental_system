import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const cars = [
  { id: 1, brand: 'Toyota', model: 'Camry', number: 'MH-12-3456', status: 'Available', imageUrl: '/Image/car-hero-section.svg' },
  { id: 2, brand: 'Honda', model: 'City', number: 'MH-14-7890', status: 'Rented', imageUrl: '/Image/car-hero-section.svg' },
  { id: 3, brand: 'Honda', model: 'City', number: 'MH-14-7892', status: 'Rented', imageUrl: '/Image/car-hero-section.svg' },
  { id: 4, brand: 'Toyota', model: 'Camry', number: 'MH-12-3456', status: 'Available', imageUrl: '/Image/car-hero-section.svg' },
];

function HostHomePage() {

  const navigate = useNavigate();

  function viewCarClick()
  {
    navigate(`/host/carinformation`)
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      {/* Page Title */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-warning">My Cars</h2>
        <p className="text-muted"><b>Manage and monitor your car listings</b></p>
      </div>

      {/* Car List */}
      <div className="container">
        <div className="row g-4">
          {cars.map((car) => (
            <div className="col-md-6" key={car.id}>
              <div className="card border-0 rounded-4 shadow-sm transition host-shadow-hover h-100">
                <div className="d-flex flex-column flex-md-row" style={{ height: '270px' }}>
                  {/* Image Section */}
                  <div
                    className="p-2"
                    style={{
                      flex: '0 0 70%',
                      borderRight: '2px solid orange',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={car.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                      className="img-fluid rounded-3 w-100 h-100 p-2"
                      style={{ objectFit: 'cover' }}
                      alt={`${car.brand} ${car.model}`}
                    />
                  </div>

                  {/* Info Section */}
                  <div
                    className="p-3 d-flex flex-column justify-content-between text-start"
                    style={{ flex: '0 0 30%' }}
                  >
                    <div>
                      <h5 className="text-warning fw-semibold">{car.brand} {car.model}</h5>
                      <ul className="list-unstyled small mt-3">
                        <li><strong>Car Number:</strong></li>
                        <li>{car.number}</li>
                        <li className="mt-2">
                          <strong>Status:</strong>{' '}
                          <span className={`badge ${car.status === 'Available' ? 'bg-success' : 'bg-secondary'}`}>
                            {car.status}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <button className="btn btn-outline-warning btn-sm mt-3 w-100" onClick={viewCarClick}>
                      View Car Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HostHomePage;

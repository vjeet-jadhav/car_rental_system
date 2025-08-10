import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMyCars } from '../../Services/host';

const ACCENT = '#fb8500';
const PLACEHOLDER = 'https://via.placeholder.com/400x250.png?text=No+Image';

function Stars({ rating = 0 }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="d-flex align-items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <FaStar key={`f${i}`} color={ACCENT} />
      ))}
      {half && <FaStarHalfAlt color={ACCENT} />}
      {Array.from({ length: empty }).map((_, i) => (
        <FaRegStar key={`e${i}`} color="#ccc" />
      ))}
      <small className="text-muted ms-2">{rating?.toFixed(1) ?? '0.0'}</small>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    AVAILABLE: 'success',
    NOTVERIFIED: 'warning',
    NOTAVAILABLE: 'danger',
    UNAVAILABLE: 'danger'
  };
  const variant = map[status?.toUpperCase()] || 'secondary';
  return (
    <span className={`badge bg-${variant} fw-semibold text-uppercase`}>
      {status}
    </span>
  );
}

export default function HostMyCars() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadCars() {
    setLoading(true);
    const res = await getMyCars();
    if (res.status === 'success') {
      setCars(Array.isArray(res.data) ? res.data : []);
    } else {
      toast.error(res.message || 'Failed to load cars');
    }
    setLoading(false);
  }

  useEffect(() => {
    loadCars();
  }, []);

  const onViewDetails = (carId) => {
    navigate('/host/carinformation', { state: { carId } });
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <ToastContainer position="top-center" />
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-dark">🚗 My Cars</h3>
          <button className="btn btn-outline-dark" onClick={loadCars}>Refresh</button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status" />
            <div className="mt-2">Loading your cars...</div>
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-5 text-muted">No cars found. Please add a car.</div>
        ) : (
          <div className="row g-4">
            {cars.map((car) => {
              const imageUrl = car.image?.imgUrl || PLACEHOLDER;

              return (
                <div key={car.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden" style={{ minHeight: 320 }}>
                    <div style={{ height: '60%', position: 'relative' }}>
                      <img
                        src={imageUrl}
                        alt={`${car.brand} ${car.carModel}`}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="position-absolute top-0 start-0 m-2 d-flex gap-2">
                        <span className="badge bg-dark">{car.brand}</span>
                        <span className="badge bg-secondary">{car.carModel}</span>
                      </div>
                    </div>

                    <div className="card-body p-3 d-flex flex-column justify-content-between" style={{ height: '40%' }}>
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <h6 className="mb-0">{car.brand} {car.carModel}</h6>
                          <StatusBadge status={car.status} />
                        </div>
                        <p className="text-muted small mb-1">{car.carNumber}</p>
                        <Stars rating={car.rating} />
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="text-muted small">Rate: <strong>₹{car.dailyRate ?? '—'}</strong></div>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => onViewDetails(car.id)}
                          >
                            Details
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => {
                              if (car.image?.imgUrl) {
                                window.open(car.image.imgUrl, '_blank');
                              } else {
                                toast.info('No image to preview');
                              }
                            }}
                          >
                            Preview
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
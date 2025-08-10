import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCarRatings } from '../../Services/host';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

function CarRatings() {
  const { state } = useLocation();
  const carId = state?.carId;

  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRatings() {
      try {
        const res = await getCarRatings(carId);
        if (res.status === 'success') {
          setRatings(res.data);
        } else {
          toast.error(res.message || 'Failed to load ratings');
        }
      } catch (err) {
        toast.error('Error fetching ratings');
      } finally {
        setLoading(false);
      }
    }

    if (carId) fetchRatings();
  }, [carId]);

  const renderStars = (count) => {
    const fullStar = '★';
    const emptyStar = '☆';
    return (
      <div className="text-warning mb-2" style={{ fontSize: '1.2rem' }}>
        {fullStar.repeat(count)}{emptyStar.repeat(5 - count)}
      </div>
    );
  };

  if (loading) {
    return <div className="text-center mt-5">Loading feedbacks...</div>;
  }

  return (
    <div className="container py-4">
      <h3 className="text-primary mb-4 text-center">🚗 Customer Feedbacks</h3>
      {ratings.length === 0 ? (
        <div className="text-muted text-center">No feedback available for this car.</div>
      ) : (
        <div className="row g-4">
          {ratings.map((rating, idx) => (
            <div key={idx} className="col-12 col-md-6">
              <div className="card shadow-lg border-0 rounded-4 h-100 bg-light">
                <div className="card-body">
                  <h5 className="fw-semibold text-dark mb-1">
                    {rating.client?.firstName} {rating.client?.lastName}
                  </h5>
                  {renderStars(rating.rating)}
                  <p className="mb-0 text-secondary fst-italic">{rating.feedback}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CarRatings;
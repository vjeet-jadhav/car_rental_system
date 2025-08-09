import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { submitFeedback } from '../../Services/user';

function ClientCarReview() {
    const [rate, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);

    const arr = [1, 2, 3, 4, 5];

    const [getFeedback, setFeedback] = useState({
        "rating": 0,
        "feedback": "",
        "car": 0
    })
    const location = useLocation();
    const navigate = useNavigate();
    const { car_id } = location.state || {};
    console.log("Car id is ", car_id);


    const submitReview = async () => {
        setFeedback({ ...getFeedback, car: car_id })
        const result = await submitFeedback(getFeedback);
        if (result && result.status == 200) {
            toast.success(result.data);
            navigate("/");

        }
        else {
            console.log("error in submit review");
        }

    }


    return (
        <div >
            <div className='container mt-5 d-flex  justify-content-evenly'
            >

                {/* image */}
                <div >
                    <img src="../public/Image/car-image-review.png" alt="" style={{ width: '500px', height: '700px' }} className='rounded-3' />
                </div>

                {/* form */}
                <div className="bg-white border rounded shadow-sm p-4 col-5">
                    <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-chat-left-text fs-3 me-2" style={{ color: 'rgb(251, 85, 25)' }}></i>
                        <h5 className="mb-0 fw-semibold">Write a Car Review</h5>
                    </div>

                    <p className="text-muted mb-4">Share your detailed experience with this vehicle</p>

                    {/* <div className="mb-3">
                    <label className="form-label">Car ID</label>
                    <input type="text" className='form-control' readOnly />
                </div> */}

                    <div className="mb-3">
                        <label className="form-label">Review Title</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Summarize your experience"
                        />
                    </div>

                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="4"
                            placeholder="Share your driving experience, performance, comfort, features you liked or disliked..."
                            onChange={(e) => setFeedback({ ...getFeedback, feedback: e.target.value })}
                        ></textarea>
                    </div>

                    <div>
                        <label className="form-label">Rating</label>
                        <div className="d-flex my-1">
                            {arr.map((star) => (
                                <i
                                    key={star}
                                    className={`bi ${(hovered || rate) >= star ? "bi-star-fill" : "bi-star"
                                        } text-warning fs-4 me-1`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        setRating(star);
                                        setFeedback({ ...getFeedback, rating: star })
                                    }}
                                    onMouseEnter={() => setHovered(star)}
                                    onMouseLeave={() => setHovered(0)}

                                ></i>
                            ))}
                        </div>
                    </div>

                    <button onClick={submitReview} className="btn d-flex align-items-center mt-3 text-white" style={{ backgroundColor: 'rgb(251, 85, 25)' }}>
                        <i className="bi bi-send me-2"></i>
                        Submit Car Review
                    </button>
                </div>


            </div >
        </div>
    )
}

export default ClientCarReview

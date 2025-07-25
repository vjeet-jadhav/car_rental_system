import React, { useState } from 'react'

function ClientCarReview() {
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    return (
        <div className='container mt-5 d-flex  justify-content-evenly  p-4'
        >

            {/* image */}
            <div >
                <img src="../public/Image/car-image-review.jpg" alt="" style={{width: '500px'}} className='rounded-3'/>
            </div>

            <div className="bg-white border rounded shadow-sm p-4 col-5">
                <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-chat-left-text fs-3 me-2" style={{ color: 'rgb(251, 85, 25)' }}></i>
                    <h5 className="mb-0 fw-semibold">Write a Car Review</h5>
                </div>

                <p className="text-muted mb-4">Share your detailed experience with this vehicle</p>

                <div className="mb-3">
                    <label className="form-label">Car ID</label>
                    <input type="text" className='form-control' readOnly />
                </div>

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
                    ></textarea>
                </div>

                <div>
                    <label className="form-label">Rating</label>
                    <div className="d-flex my-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <i
                                key={star}
                                className={`bi ${(hovered || rating) >= star ? "bi-star-fill" : "bi-star"
                                    } text-warning fs-4 me-1`}
                                style={{ cursor: "pointer" }}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHovered(star)}
                                onMouseLeave={() => setHovered(0)}
                            ></i>
                        ))}
                    </div>
                </div>

                <button className="btn d-flex align-items-center mt-3 text-white" style={{ backgroundColor: 'rgb(251, 85, 25)' }}>
                    <i className="bi bi-send me-2"></i>
                    Submit Car Review
                </button>
            </div>


        </div>
    )
}

export default ClientCarReview

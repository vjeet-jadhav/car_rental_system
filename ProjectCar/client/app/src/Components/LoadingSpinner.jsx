import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoadingSpinner = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "300px" }}>
      <div className="spinner-border text-warning" style={{ width: "4rem", height: "4rem" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="mt-3 fs-5 fw-semibold text-secondary">Loading...</div>
      <div className="text-muted">Please wait while we prepare your content</div>
    </div>
  );
};

export default LoadingSpinner;

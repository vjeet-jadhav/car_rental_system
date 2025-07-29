import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Dummy data (would normally come in via props or context)
const carInfo = {
  brand:        'Toyota',
  model:        'Corolla',
  variant:      'LE',
  number:       'MH-12-3456',
  registration: 'TN-09-6789',
  city:         'Pune',
  state:        'Maharashtra',
  pincode:      '411057',
  address:      '123, MG Road, Shivaji Nagar',
  transmission: 'Automatic',
  seats:        5,
  fuel:         'Petrol'
};

const mainImage     = '/Image/car-hero-section.svg';
const galleryImages = [
  '/Image/car-hero-section.svg',
  '/Image/car-hero-section.svg',
  '/Image/car-hero-section.svg',
  '/Image/car-hero-section.svg',
];

function HostCarInformation() {
  const [isEditing, setIsEditing] = useState(false);
  const [editFields, setEditFields] = useState({
    city: carInfo.city,
    state: carInfo.state,
    pincode: carInfo.pincode,
    address: carInfo.address,
  });

  // Editable field names
  const editable = ['City', 'State', 'Pincode', 'Address'];

  const handleEditClick = () => {
    setEditFields({
      city: carInfo.city,
      state: carInfo.state,
      pincode: carInfo.pincode,
      address: carInfo.address,
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = () => {
    const updated = {
      ...carInfo,
      city:    editFields.city,
      state:   editFields.state,
      pincode: editFields.pincode,
      address: editFields.address,
    };
    console.log('Submitted data:', updated);
    // TODO: call your API / parent handler here with `updated`
    setIsEditing(false);
  };

  // All fields in desired sequence
  const fields = [
    ['Brand',        carInfo.brand],
    ['Model',        carInfo.model],
    ['Variant',      carInfo.variant],
    ['Car Number',   carInfo.number],
    ['Registration', carInfo.registration],
    ['Transmission', carInfo.transmission],
    ['Seats',        carInfo.seats],
    ['Fuel',         carInfo.fuel],
    ['City',         editFields.city],
    ['State',        editFields.state],
    ['Pincode',      editFields.pincode],
    ['Address',      editFields.address],
  ];

  return (
    <div className="container-fluid p-4">
      {/* Image Box */}
      <div
        className="p-2 d-flex border border-2 border-warning rounded-4 overflow-hidden mx-auto mt-3"
        style={{ width: '90%', minHeight: '450px' }}
      >
        {/* Main Image (50%) */}
        <div style={{ flex: '0 0 50%' }}>
          <img
            src={mainImage}
            alt="Main Car"
            className="p-3 img-fluid w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Thumbnails (50%) */}
        <div
          className="p-3 d-flex flex-column justify-content-between"
          style={{ flex: '0 0 50%' }}
        >
          {[0, 2].map(rowStart => (
            <div key={rowStart} className="d-flex gap-2" style={{ height: '49%' }}>
              {galleryImages.slice(rowStart, rowStart + 2).map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Thumb ${rowStart + idx + 1}`}
                  className="p-2 rounded-4 border"
                  style={{ width: '50%', height: '100%', objectFit: 'cover' }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Car Details: 4 per row */}
      <div className="container mt-5" style={{ width: '90%' }}>
        <h4 className="text-warning mb-3">Car Details</h4>
        <div className="row g-2">
          {fields.map(([label, value], idx) => {
            const key = label;
            const lowercase = label.toLowerCase().replace(' ', '');
            const isFieldEditable = editable.includes(label);

            return (
              <div className="col-6 col-md-3" key={key + idx}>
                <div className="p-2 bg-white border rounded shadow-sm h-100">
                  <small className="text-muted">{label}</small>
                  {isEditing && isFieldEditable ? (
                    <input
                      type="text"
                      className="form-control form-control-sm mt-1"
                      value={editFields[lowercase]}
                      onChange={e =>
                        setEditFields(prev => ({ ...prev, [lowercase]: e.target.value }))
                      }
                    />
                  ) : (
                    <p className="mt-1 mb-0 fw-semibold small">{value}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center mt-4">
        {!isEditing ? (
          <button className="btn btn-warning px-5" onClick={handleEditClick}>
            Edit Details
          </button>
        ) : (
          <>
            <button
              className="btn btn-outline-secondary me-3 px-4"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="btn px-4 text-white" onClick={handleSubmit} style={{backgroundColor:'rgb(251, 85, 25)'}}>
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default HostCarInformation;

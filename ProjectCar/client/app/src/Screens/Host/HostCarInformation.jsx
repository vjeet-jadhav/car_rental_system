import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateCar } from '../../Services/host'
import { toast } from 'react-toastify';
import { Message } from './../../../node_modules/esbuild/lib/main.d';

function HostCarInformation() {
  const { state } = useLocation();
  const [car, setCar] = useState(state?.car);

  if (!car) return <div className="text-center mt-5">No car data found.</div>;

  const mainImage = car.imagelist?.[0]?.imgUrl || '/Image/car-hero-section.svg';
  const galleryImages = car.imagelist?.slice(1, 5).map(img => img.imgUrl) || [];

  const [isEditing, setIsEditing] = useState(false);
  const [editFields, setEditFields] = useState({
    address: car.address?.address || '',
    dailyRate: car.dailyRate ?? '',
    city: car.address?.city || '',
    state: car.address?.state || '',
    serviceArea: car.address?.serviceArea || '',
    pinCode: car.address?.pinCode || ''
  });

  const [errors, setErrors] = useState({});

  // Mapping labels to field keys
  const fieldKeyMap = {
    'Daily Rate': 'dailyRate',
    'Address': 'address',
    'City': 'city',
    'State': 'state',
    'Service Area': 'serviceArea',
    'Pincode': 'pinCode'
  };

  const validate = () => {
    const newErrors = {};

    if (!editFields.address.trim()) newErrors.address = 'Address is required';
    if (!editFields.dailyRate || isNaN(editFields.dailyRate)) newErrors.dailyRate = 'Valid rate required';
    if (!editFields.city.trim()) newErrors.city = 'City is required';
    if (!editFields.state.trim()) newErrors.state = 'State is required';
    if (!editFields.serviceArea.trim()) newErrors.serviceArea = 'Service area is required';
    if (!editFields.pinCode || isNaN(editFields.pinCode)) newErrors.pinCode = 'Valid pincode required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditClick = () => {
    setErrors({});
    setIsEditing(true);
  };

  const handleSubmit = async () => {
  if (!validate()) return;

  const updated = {
    id: car.id,
    brand: car.brand,
    carModel: car.carModel,
    varient: car.varient,
    yearOfManufacturing: car.yearOfManufacturing,
    carNumber: car.carNumber,
    rcNumber: car.rcNumber,
    dailyRate: parseFloat(editFields.dailyRate),
    status: car.status,
    fuelType: car.fuelType,
    transmissionType: car.transmissionType,
    seatCapacity: car.seatCapacity,
    address: {
      address: editFields.address,
      city: editFields.city,
      state: editFields.state,
      serviceArea: editFields.serviceArea,
      pinCode: parseInt(editFields.pinCode, 10)
    }
  };

  console.log('Submitting payload:', updated);

  try {
    const result = await updateCar(updated);
    if (result.status === 'success') {
      toast.success(result.message);
      setCar(updated);
      setIsEditing(false);
    } else {
      toast.error(result.message || 'Updation Failed');
    }
  } catch (err) {
    toast.error('Unexpected error occurred');
  }
};

  const fields = [
    ['Brand', car.brand],
    ['Model', car.carModel],
    ['Variant', car.varient],
    ['Car Number', car.carNumber],
    ['RC Number', car.carNumber],
    ['Year', car.yearOfManufacturing?.split('T')[0]],
    ['Transmission', car.transmissionType],
    ['Seats', car.seatCapacity],
    ['Fuel', car.fuelType],
    ['Status', car.status],
    ['Daily Rate', editFields.dailyRate],
    ['Address', editFields.address],
    ['City', editFields.city],
    ['State', editFields.state],
    ['Service Area', editFields.serviceArea],
    ['Pincode', editFields.pinCode]
  ];

  const editableFields = Object.keys(fieldKeyMap);

  return (
    <div className="container-fluid p-4">
      {/* Image Section */}
      <div className="p-2 d-flex border border-2 border-warning rounded-4 overflow-hidden mx-auto mt-3" style={{ width: '90%', minHeight: '450px' }}>
        <div style={{ flex: '0 0 50%' }}>
          <img
            src={mainImage}
            alt="Main Car"
            className="p-3 img-fluid w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="p-3 d-flex flex-column justify-content-between" style={{ flex: '0 0 50%' }}>
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

      {/* Car Details */}
      <div className="container mt-5" style={{ width: '90%' }}>
        <h4 className="text-warning mb-3">Car Details</h4>
        <div className="row g-2">
          {fields.map(([label, value], idx) => {
            const fieldKey = fieldKeyMap[label];
            const isEditable = editableFields.includes(label);
            const error = fieldKey ? errors[fieldKey] : null;

            return (
              <div className="col-6 col-md-3" key={label + idx}>
                <div className="p-2 bg-white border rounded shadow-sm h-100">
                  <small className="text-muted">{label}</small>
                  {isEditing && isEditable ? (
                    <>
                      <input
                        type={label === 'Daily Rate' || label === 'Pincode' ? 'number' : 'text'}
                        className={`form-control form-control-sm mt-1 ${error ? 'is-invalid' : ''}`}
                        value={editFields[fieldKey]}
                        onChange={e =>
                          setEditFields(prev => ({ ...prev, [fieldKey]: e.target.value }))
                        }
                      />
                      {error && <div className="invalid-feedback">{error}</div>}
                    </>
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
            <button className="btn btn-outline-secondary me-3 px-4" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn px-4 text-white" onClick={handleSubmit} style={{ backgroundColor: 'rgb(251, 85, 25)' }}>
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default HostCarInformation;
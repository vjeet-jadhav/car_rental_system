import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateCar, getCarById, sheduleCar, unsheduleCar } from '../../Services/host';
import { toast } from 'react-toastify';

function HostCarInformation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const incomingCarId = state?.carId;
  const incomingCarObj = state?.car;

  const [carId] = useState(incomingCarId || incomingCarObj?.id || null);
  const [car, setCar] = useState(incomingCarObj || null);
  const [loading, setLoading] = useState(!incomingCarObj);
  const [isEditing, setIsEditing] = useState(false);

  const [editFields, setEditFields] = useState({
    address: '',
    dailyRate: '',
    city: '',
    state: '',
    serviceArea: '',
    pinCode: ''
  });
  const [errors, setErrors] = useState({});

  const [scheduleFields, setScheduleFields] = useState({
    sheduledFrom: '',
    sheduledTill: ''
  });
  const [scheduleErrors, setScheduleErrors] = useState({});

  const fieldKeyMap = {
    'Daily Rate': 'dailyRate',
    'Address': 'address',
    'City': 'city',
    'State': 'state',
    'Service Area': 'serviceArea',
    'Pincode': 'pinCode'
  };

  // loadCar: fetch authoritative car object from server
  const loadCar = useCallback(async () => {
    if (!carId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await getCarById(carId);
      if (res.status === 'success') {
        const data = res.data;
        setCar(data);

        // populate edit fields from server response (so UI shows latest values)
        setEditFields({
          address: data.address?.address || '',
          dailyRate: data.dailyRate ?? '',
          city: data.address?.city || '',
          state: data.address?.state || '',
          serviceArea: data.address?.serviceArea || '',
          pinCode: data.address?.pinCode || ''
        });

        // populate schedule fields if present
        setScheduleFields({
          sheduledFrom: data.sheduledFrom ? (data.sheduledFrom.split('T')[0]) : '',
          sheduledTill: data.sheduledTill ? (data.sheduledTill.split('T')[0]) : ''
        });
      } else {
        toast.error(res.message || 'Failed to load car details');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error fetching car details');
    } finally {
      setLoading(false);
    }
  }, [carId]);

  // load on mount / when carId changes
  useEffect(() => {
    if (!car && carId) loadCar();
    // if incomingCarObj existed, it was set already; still keep ability to refresh
  }, [carId, car, loadCar]);

  const validate = () => {
    const newErrors = {};
    if (!editFields.address?.trim()) newErrors.address = 'Address is required';
    if (!editFields.dailyRate || isNaN(editFields.dailyRate)) newErrors.dailyRate = 'Valid rate required';
    if (!editFields.city?.trim()) newErrors.city = 'City is required';
    if (!editFields.state?.trim()) newErrors.state = 'State is required';
    if (!editFields.serviceArea?.trim()) newErrors.serviceArea = 'Service area is required';
    if (!editFields.pinCode || isNaN(editFields.pinCode)) newErrors.pinCode = 'Valid pincode required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Pure check for schedule validity
  const isScheduleValid = () => {
    const today = new Date().toISOString().split('T')[0];
    const { sheduledFrom: from, sheduledTill: till } = scheduleFields;
    if (!from || !till) return false;
    if (from <= today) return false;
    if (till <= today) return false;
    if (from > till) return false;
    return true;
  };

  const validateSchedule = () => {
    const errs = {};
    const today = new Date().toISOString().split('T')[0];
    const from = scheduleFields.sheduledFrom;
    const till = scheduleFields.sheduledTill;

    if (!from) errs.sheduledFrom = 'Start date is required';
    if (!till) errs.sheduledTill = 'End date is required';
    if (from && from <= today) errs.sheduledFrom = 'Start date must be in the future';
    if (till && till <= today) errs.sheduledTill = 'End date must be in the future';
    if (from && till && from > till) errs.sheduledTill = 'End date must be after start date';

    setScheduleErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleEditClick = () => {
    setErrors({});
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (car) {
      setEditFields({
        address: car.address?.address || '',
        dailyRate: car.dailyRate ?? '',
        city: car.address?.city || '',
        state: car.address?.state || '',
        serviceArea: car.address?.serviceArea || '',
        pinCode: car.address?.pinCode || ''
      });
    }
    setIsEditing(false);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    if (!car) return toast.error('Car not loaded');

    const updated = {
      id: car.id,
      brand: car.brand,
      carModel: car.carModel,
      varient: car.varient,
      yearOfManufacturing: car.yearOfManufacturing,
      carNumber: car.carNumber,
      rcNumber: car.carNumber, // keep as-is
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

    try {
      const result = await updateCar(updated);
      if (result.status === 'success') {
        toast.success(result.message || 'Updated successfully');
        setIsEditing(false);
        // DO NOT setCar(updated). Instead re-fetch authoritative data from server:
        await loadCar();
      } else {
        toast.error(result.message || 'Updation Failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Unexpected error occurred');
    }
  };

  const handleSchedule = async () => {
    if (!car) return toast.error('Car not loaded');
    if (!validateSchedule()) return;
    try {
      const res = await sheduleCar(car.id, scheduleFields);
      if (res?.status === 'success') {
        toast.success(res.message || 'Car scheduled successfully!');
        // do not update local car; reload authoritative object:
        await loadCar();
      } else {
        toast.error(res?.message || 'Scheduling failed');
      }
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || e.message || 'Scheduling failed');
    }
  };

  const handleUnschedule = async () => {
    if (!car) return toast.error('Car not loaded');
    try {
      const res = await unsheduleCar(car.id);
      if (res?.status === 'success') {
        toast.success(res.message || 'Car unscheduled successfully');
        // reload authoritative object from server:
        await loadCar();
      } else {
        toast.error(res?.message || 'Unschedule failed');
      }
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || e.message || 'Unschedule failed');
    }
  };

  const handleSeeFeedback = () => {
    if (!car) return toast.error('Car not loaded');
    navigate('/host/car/feedbacks', { state: { carId: car.id } });
  };

  if (loading) {
    return <div className="text-center mt-5">Loading car details...</div>;
  }

  if (!car) {
    return <div className="text-center mt-5">No car data found.</div>;
  }

  const mainImage = car.imagelist?.[0]?.imgUrl || '/Image/car-hero-section.svg';
  const galleryImages = car.imagelist?.slice(1, 5).map(img => img.imgUrl) || [];

  // helper to display placeholder date or "null"
  const datePlaceholder = (raw) => {
    if (!raw) return 'null';
    return raw.split('T')[0];
  };

  const fields = [
    ['Brand', car.brand],
    ['Model', car.carModel],
    ['Variant', car.varient],
    ['Car Number', car.carNumber],
    ['RC Number', car.rcNumber],
    ['Year', (car.yearOfManufacturing || '').split('T')[0]],
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
  const canUnschedule = !!(car.sheduledFrom || car.sheduledTill);

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
                        onChange={e => setEditFields(prev => ({ ...prev, [fieldKey]: e.target.value }))}
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

      {/* Edit Controls - moved BEFORE Schedule */}
      <div className="text-center mt-4">
        {!isEditing ? (
          <button className="btn btn-warning px-5" onClick={handleEditClick}>Edit Details</button>
        ) : (
          <>
            <button className="btn btn-outline-secondary me-3 px-4" onClick={handleCancel}>Cancel</button>
            <button className="btn px-4 text-white" onClick={handleSubmit} style={{ backgroundColor: 'rgb(251, 85, 25)' }}>Submit</button>
          </>
        )}
      </div>

      {/* Schedule Section (conditionally rendered: hide when NOTVERIFIED) */}
      {car.status !== 'NOTVERIFIED' ? (
        <div className="container mt-5" style={{ width: '90%' }}>
          <h4 className="text-warning mb-3">Schedule Car</h4>
          <div className="d-flex justify-content-between align-items-end">
            <div className="d-flex flex-column flex-md-row gap-3">
              <div>
                <label className="form-label small mb-1">Schedule From</label>
                <input
                  type="date"
                  className={`form-control form-control-sm ${scheduleErrors.sheduledFrom ? 'is-invalid' : ''}`}
                  value={scheduleFields.sheduledFrom}
                  onChange={e => setScheduleFields(prev => ({ ...prev, sheduledFrom: e.target.value }))}
                  placeholder={datePlaceholder(car?.sheduledFrom)}
                />
                {scheduleErrors.sheduledFrom && <div className="invalid-feedback">{scheduleErrors.sheduledFrom}</div>}
              </div>

              <div>
                <label className="form-label small mb-1">Schedule Till</label>
                <input
                  type="date"
                  className={`form-control form-control-sm ${scheduleErrors.sheduledTill ? 'is-invalid' : ''}`}
                  value={scheduleFields.sheduledTill}
                  onChange={e => setScheduleFields(prev => ({ ...prev, sheduledTill: e.target.value }))}
                  placeholder={datePlaceholder(car?.sheduledTill)}
                />
                {scheduleErrors.sheduledTill && <div className="invalid-feedback">{scheduleErrors.sheduledTill}</div>}
              </div>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-success px-4" onClick={handleSchedule} disabled={!isScheduleValid()}>Schedule</button>

              <button className="btn btn-outline-danger px-3" onClick={handleUnschedule} disabled={!canUnschedule}>
                Unschedule
              </button>

              <button className="btn btn-outline-primary px-3" onClick={handleSeeFeedback}>
                See Feedback
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-4" style={{ width: '90%' }}>
          <div className="alert alert-warning">Car is not verified yet. Scheduling, unscheduling and feedback are not available.</div>
        </div>
      )}
    </div>
  );
}

export default HostCarInformation;


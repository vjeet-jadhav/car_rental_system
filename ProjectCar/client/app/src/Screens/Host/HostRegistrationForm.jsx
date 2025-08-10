// src/Screens/Host/HostRegistrationForm.jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaCar, FaMapMarkerAlt, FaCoins, FaCloudUploadAlt, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerCar, uploadCarImages } from '../../Services/host';

const ACCENT = '#fb8500';

const SERVICE_AREAS = [
  'ShivajiNagar','Hinjewadi','Wakad','Pimpari-Chinchwad','Baner','Balewadi','Katraj','Pashan',
  'KarveNagar','Swarget','Viman Nagar','Hadapsar','Kharadi','Kothrud','Khadkwasala'
];

export default function HostRegistrationForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const car = state?.car || {};

  const [dailyRate, setDailyRate] = useState(car.dailyRate || '');
  const [address, setAddress] = useState({
    address: '', city: '', state: '', serviceArea: '', pinCode: ''
  });

  const [images, setImages] = useState({ main:null, front:null, back:null, left:null, right:null });
  const [previews, setPreviews] = useState({ main:'', front:'', back:'', left:'', right:'' });
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    if (!car.id) navigate('/');
    return () => {
      Object.values(previews).forEach(url => { if (url) URL.revokeObjectURL(url); });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [car]);

  const handleAddrChange = e => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previews[key]) URL.revokeObjectURL(previews[key]);
    const url = URL.createObjectURL(file);
    setImages(prev => ({ ...prev, [key]: file }));
    setPreviews(prev => ({ ...prev, [key]: url }));
  };

  const removeFile = key => {
    if (previews[key]) URL.revokeObjectURL(previews[key]);
    setImages(prev => ({ ...prev, [key]: null }));
    setPreviews(prev => ({ ...prev, [key]: '' }));
  };

  const allImagesPresent = Object.values(images).every(f => f);
  const allAddressFilled = address.address && address.city && address.state && address.serviceArea && address.pinCode;
  const dailyRateFilled = !!dailyRate;
  const isFormValid = allImagesPresent && allAddressFilled && dailyRateFilled;

  const validateInputs = () => {
    if (!dailyRate) { toast.error('Please enter daily rate'); return false; }
    for (let k of Object.keys(address)) {
      if (!address[k]) { toast.error(`Please fill "${k}"`); return false; }
    }
    const missing = Object.entries(images).filter(([k,v]) => !v).map(([k]) => k);
    if (missing.length) { toast.error(`Please upload images for: ${missing.join(', ')}`); return false; }
    return true;
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setLoading(true);

    const payload = {
      id: car.id,
      brand: car.brand,
      carModel: car.carModel,
      varient: car.varient,
      yearOfManufacturing: car.yearOfManufacturing,
      carNumber: car.rcNumber,
      rcNumber: car.rcNumber,
      dailyRate: Number(dailyRate),
      fuelType: car.fuelType,
      transmissionType: car.transmissionType,
      seatCapacity: car.seatCapacity,
      address: {
        address: address.address,
        city: address.city,
        state: address.state,
        serviceArea: address.serviceArea,
        pinCode: Number(address.pinCode)
      }
    };

    try {
      // 1) register car — expects ApiResponseWithId with .data.carId
      const regRes = await registerCar(payload);

      if (regRes.status !== 'success') {
        toast.error(regRes.message || 'Registration failed');
        setLoading(false);
        return;
      }

      // Prefer returned carId, fallback to prepopulated car.id
      const returnedCarId = regRes.data?.carId ?? regRes.data?.carId ?? null;
      let carId = returnedCarId || car.id || null;

      if (!carId) {
        // If backend didn't return id, stop because upload requires carId
        toast.success(regRes.message || 'Car registered, but no carId returned — images cannot be uploaded.');
        setTimeout(() => navigate('/host'), 1500);
        setLoading(false);
        return;
      }

      // 2) upload images
      const orderedFiles = [images.main, images.front, images.back, images.left, images.right];
      const uploadRes = await uploadCarImages(carId, orderedFiles);

      if (uploadRes.status !== 'success') {
        toast.error(uploadRes.message || 'Image upload failed');
        setLoading(false);
        return;
      }

      toast.success('Car added successfully!');
      setTimeout(() => navigate('/host'), 1500);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const boxBaseStyle = {
    borderRadius: 10,
    border: `2px solid rgba(0,0,0,0.08)`,
    minHeight: 90,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    background: '#fff'
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh', padding: '2rem 0' }}>
      <ToastContainer position="top-center" />

      <div className="card shadow-lg" style={{ width: '100%', maxWidth: '900px', border: 'none', borderRadius: '1rem' }}>
        {/* HEADER */}
        <div className="d-flex align-items-center justify-content-center"
             style={{ background: `linear-gradient(90deg, ${ACCENT}, orangered)`, borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', padding: '1rem 0' }}>
          <FaShieldAlt size={28} className="text-white me-2" />
          <h4 className="text-white mb-0">Complete Your Car Listing</h4>
        </div>

        <div className="row g-0">
          {/* LEFT */}
          <div className="col-md-5 bg-white p-4">
            <div className="d-flex align-items-center mb-3">
              <FaCar size={36} className="text-warning me-2" style={{ color: ACCENT }} />
              <h5 className="mb-0" style={{ color: ACCENT }}>Vehicle Details</h5>
            </div>
            <ul className="list-group list-group-flush">
              {[
                ['Brand', car.brand],
                ['Model', car.carModel],
                ['Variant', car.varient],
                ['Year', car.yearOfManufacturing?.slice(0,4)],
                ['RC / Car No.', car.rcNumber],
                ['Seats', car.seatCapacity],
                ['Fuel', car.fuelType],
                ['Transmission', car.transmissionType]
              ].map(([label, val]) => (
                <li key={label} className="list-group-item d-flex justify-content-between align-items-center"
                    style={{ padding: '0.75rem 1rem', border: 'none', borderBottom: '1px solid #eee' }}>
                  <small className="text-muted">{label}</small>
                  <span className="fw-semibold">{val}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="col-md-7 bg-white p-4">
            <div className="d-flex align-items-center mb-3">
              <FaMapMarkerAlt size={28} className="text-warning me-2" style={{ color: ACCENT }} />
              <h5 className="mb-0" style={{ color: ACCENT }}>Your Address & Rate</h5>
            </div>

            <form onSubmit={onFormSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: ACCENT }}>
                  <FaCoins className="me-1" style={{ color: ACCENT }} />
                  Daily Rate (₹)
                </label>
                <input type="number" className="form-control form-control-lg rounded-pill" placeholder="Enter rate"
                       min="0" value={dailyRate} onChange={e => setDailyRate(e.target.value)} style={{ border: '1px solid #ddd' }} />
              </div>

              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label fw-semibold" style={{ color: ACCENT }}>Address</label>
                  <input name="address" className="form-control rounded-pill" placeholder="e.g. 123 Main St"
                         value={address.address} onChange={handleAddrChange} />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: ACCENT }}>City</label>
                  <input name="city" className="form-control rounded-pill" placeholder="City"
                         value={address.city} onChange={handleAddrChange} />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: ACCENT }}>State</label>
                  <input name="state" className="form-control rounded-pill" placeholder="State"
                         value={address.state} onChange={handleAddrChange} />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: ACCENT }}>Service Area</label>
                  <select name="serviceArea" className="form-select rounded-pill" value={address.serviceArea}
                          onChange={handleAddrChange} style={{ border: `1px solid ${ACCENT}` }}>
                    <option value="">Choose Service Area</option>
                    {SERVICE_AREAS.map(sa => <option key={sa} value={sa}>{sa}</option>)}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: ACCENT }}>Pin Code</label>
                  <input name="pinCode" type="number" className="form-control rounded-pill" placeholder="6-digit Pin"
                         value={address.pinCode} onChange={handleAddrChange} />
                </div>
              </div>

              <div className="text-center mt-4">
                <button type="submit" className="btn btn-warning btn-lg px-5 rounded-pill shadow"
                        disabled={!isFormValid || loading} style={{ background: ACCENT, borderColor: ACCENT }}>
                  {loading ? 'Saving...' : 'Submit Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* IMAGES */}
        <div className="p-3" style={{ background: '#faf9f7', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}>
          <div className="mb-2" style={{ color: ACCENT, fontWeight: 600 }}>Upload Photos</div>
          <div style={{ color: '#666', marginBottom: 8 }}>Select images in order: <strong>main, front, back, left, right</strong></div>

          <div className="d-flex flex-row flex-wrap align-items-start" style={{ gap: 12, justifyContent: 'space-between' }}>
            {['main','front','back','left','right'].map((key) => {
              const isHovered = hovered === key;
              const preview = previews[key];
              return (
                <div key={key} onMouseEnter={() => setHovered(key)} onMouseLeave={() => setHovered(null)}
                     style={{
                       ...boxBaseStyle,
                       flex: '0 0 18%',
                       border: `2px solid ${preview ? ACCENT : 'rgba(0,0,0,0.08)'}`,
                       boxShadow: isHovered ? `0 8px 18px rgba(0,0,0,0.12)` : '0 4px 10px rgba(0,0,0,0.06)',
                       transform: isHovered ? 'translateY(-4px)' : 'none',
                       position: 'relative',
                       background: '#fff'
                     }}>
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: ACCENT, textTransform: 'capitalize' }}>{key}</div>
                    <div style={{ marginTop: 8 }}>
                      {preview ? (
                        <img src={preview} alt={key} style={{ width: '100%', height: 88, objectFit: 'cover', borderRadius: 8, border: `1px solid #eee` }} />
                      ) : (
                        <div style={{ width: '100%', height: 88, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>
                          <FaCloudUploadAlt size={28} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ width: '100%', display: 'flex', gap: 6, justifyContent: 'center', marginTop: 8 }}>
                    <label className="btn btn-sm btn-outline-secondary" style={{ padding: '6px 10px', borderRadius: 20, fontSize: 13 }}>
                      Choose
                      <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, key)} style={{ display: 'none' }} />
                    </label>

                    {images[key] && (
                      <button type="button" onClick={() => removeFile(key)} className="btn btn-sm btn-outline-danger"
                              style={{ padding: '6px 10px', borderRadius: 20, fontSize: 13 }}>
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-2" style={{ fontSize: 13, color: allImagesPresent ? 'green' : '#666' }}>
            {allImagesPresent ? 'All images selected ✔' : 'All five images are required before you can submit.'}
          </div>
        </div>
      </div>
    </div>
  );
}

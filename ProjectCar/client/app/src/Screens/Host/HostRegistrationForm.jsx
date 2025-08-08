// // src/Screens/Host/HostRegistrationForm.jsx
// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { FaMapMarkerAlt, FaCar, FaShieldAlt } from 'react-icons/fa';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { registerCar } from '../../Services/host';

// function HostRegistrationForm() {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const car = state?.car || {};

//   // Address fields
//   const [address, setAddress] = useState({
//     address: '',
//     city: '',
//     state: '',
//     serviceArea: '',
//     pinCode: ''
//   });

//   // Daily rate field (editable now)
//   const [dailyRate, setDailyRate] = useState(car.dailyRate || '');

//   useEffect(() => {
//     if (!car.id) navigate('/host');
//   }, [car, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAddress((prev) => ({ ...prev, [name]: value }));
//   };

//   const onFormSubmit = async (e) => {
//     e.preventDefault();

//     // Validate address fields
//     for (let key of Object.keys(address)) {
//       if (!address[key]) {
//         toast.error(`Please fill "${key}"`);
//         return;
//       }
//     }
//     if (!dailyRate) {
//       toast.error('Please enter a daily rate');
//       return;
//     }

//     // Build payload exactly matching CarRegistrationDTO
//     const payload = {
//       id:                  car.id,
//       brand:               car.brand,
//       carModel:            car.carModel,
//       varient:             car.varient,
//       yearOfManufacturing: car.yearOfManufacturing,
//       // use rcNumber for both carNumber and rcNumber
//       carNumber:           car.rcNumber,
//       rcNumber:            car.rcNumber,
//       dailyRate:           Number(dailyRate),
//       // status omitted—backend will set NOTVERIFIED
//       fuelType:            car.fuelType,
//       transmissionType:    car.transmissionType,
//       seatCapacity:        car.seatCapacity,
//       address: {
//         address:     address.address,
//         city:        address.city,
//         state:       address.state,
//         serviceArea: address.serviceArea,
//         pinCode:     Number(address.pinCode)
//       }
//     };

//     const { status, message } = await registerCar(payload);

//     if (status === 'success') {
//       toast.success(message);
//       setTimeout(() => navigate('/host'), 1500);
//     } else {
//       toast.error(message);
//     }
//   };

//   return (
//     <div className="bg-white min-vh-100 py-5">
//       <ToastContainer position="top-center" />

//       <div className="container">
//         <h3 className="text-center mb-4 fw-bold">
//           <FaShieldAlt className="text-warning me-2" />
//           Complete Your Car Listing
//         </h3>

//         <div
//           className="card mx-auto shadow"
//           style={{
//             maxWidth: '900px',
//             borderRadius: '15px',
//             border: '2px solid orange'
//           }}
//         >
//           <div className="row g-0">
//             {/* LEFT: read-only car info */}
//             <div className="col-md-5 bg-light p-4">
//               <FaCar size={48} className="text-warning mb-2" />
//               <h5 className="fw-semibold mb-3">Vehicle Details</h5>
//               {[
//                 ['Brand',         car.brand],
//                 ['Model',         car.carModel],
//                 ['Variant',       car.varient],
//                 ['Year',          car.yearOfManufacturing.slice(0, 4)],
//                 ['RC / Car No.',  car.rcNumber],
//                 ['Seats',         car.seatCapacity],
//                 ['Fuel',          car.fuelType],
//                 ['Transmission',  car.transmissionType]
//               ].map(([label, val]) => (
//                 <div key={label} className="mb-2">
//                   <small className="text-muted">{label}</small>
//                   <div className="form-control bg-white border-0 ps-0" readOnly>
//                     {val}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* RIGHT: address + dailyRate form */}
//             <div className="col-md-7 p-4">
//               <FaMapMarkerAlt size={32} className="text-warning mb-2" />
//               <h5 className="fw-semibold mb-3">Your Address & Rate</h5>

//               <form onSubmit={onFormSubmit} className="row g-3">
//                 {/* Daily Rate input */}
//                 <div className="col-12">
//                   <label className="form-label">Daily Rate (₹)</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={dailyRate}
//                     onChange={(e) => setDailyRate(e.target.value)}
//                     placeholder="Enter daily rate"
//                     min="0"
//                   />
//                 </div>

//                 {/* Address fields */}
//                 {['address','city','state','serviceArea','pinCode'].map((field) => (
//                   <div
//                     key={field}
//                     className={field === 'address' ? 'col-12' : 'col-md-6'}
//                   >
//                     <label className="form-label">
//                       {field === 'serviceArea'
//                         ? 'Service Area'
//                         : field.charAt(0).toUpperCase() + field.slice(1)}
//                     </label>
//                     <input
//                       name={field}
//                       value={address[field]}
//                       onChange={handleChange}
//                       type={field === 'pinCode' ? 'number' : 'text'}
//                       className="form-control"
//                       placeholder={
//                         field === 'address'
//                           ? 'e.g. 123 Main St'
//                           : field === 'serviceArea'
//                           ? 'Downtown'
//                           : field === 'pinCode'
//                           ? '6-digit Pin Code'
//                           : field.charAt(0).toUpperCase() + field.slice(1)
//                       }
//                     />
//                   </div>
//                 ))}

//                 <div className="col-12 text-center mt-4">
//                   <button
//                     type="submit"
//                     className="btn btn-warning px-5 fw-semibold"
//                   >
//                     Submit Listing
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HostRegistrationForm;


// src/Screens/Host/HostRegistrationForm.jsx
// src/Screens/Host/HostRegistrationForm.jsx
// src/Screens/Host/HostRegistrationForm.jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaCar, FaMapMarkerAlt, FaCoins } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerCar } from '../../Services/host';

export default function HostRegistrationForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const car = state?.car || {};

  const [dailyRate, setDailyRate] = useState(car.dailyRate || '');
  const [address, setAddress] = useState({ address:'', city:'', state:'', serviceArea:'', pinCode:'' });

  useEffect(() => {
    if (!car.id) navigate('/host');
  }, [car, navigate]);

  const handleAddrChange = e => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!dailyRate) return toast.error('Enter daily rate');
    for (let k of Object.keys(address))
      if (!address[k]) return toast.error(`Fill "${k}"`);

    const payload = {
      id: car.id,
      brand: car.brand, carModel: car.carModel, varient: car.varient,
      yearOfManufacturing: car.yearOfManufacturing,
      carNumber: car.rcNumber, rcNumber: car.rcNumber,
      dailyRate: Number(dailyRate),
      fuelType: car.fuelType, transmissionType: car.transmissionType,
      seatCapacity: car.seatCapacity,
      address: { ...address, pinCode: Number(address.pinCode) }
    };

    const { status, message } = await registerCar(payload);
    if (status==='success') {
      toast.success(message);
      setTimeout(() => navigate('/host'), 1500);
    } else toast.error(message);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: '100vh', padding: '2rem 0' }}
    >
      <ToastContainer position="top-center" />

      <div
        className="card shadow-lg"
        style={{ width: '100%', maxWidth: '900px', border: 'none', borderRadius: '1rem' }}
      >
        {/* HEADER */}
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            background: 'linear-gradient(90deg, orange, orangered)',
            borderTopLeftRadius: '1rem',
            borderTopRightRadius: '1rem',
            padding: '1rem 0'
          }}
        >
          <FaShieldAlt size={28} className="text-white me-2" />
          <h4 className="text-white mb-0">Complete Your Car Listing</h4>
        </div>

        <div className="row g-0">
          {/* LEFT: Vehicle Details in a clean list */}
          <div className="col-md-5 bg-white p-4">
            <div className="d-flex align-items-center mb-3">
              <FaCar size={36} className="text-warning me-2" />
              <h5 className="mb-0">Vehicle Details</h5>
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
                <li
                  key={label}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{ padding: '0.75rem 1rem', border: 'none', borderBottom: '1px solid #eee' }}
                >
                  <small className="text-muted">{label}</small>
                  <span className="fw-semibold">{val}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Address & Rate Form */}
          <div className="col-md-7 bg-white p-4">
            <div className="d-flex align-items-center mb-3">
              <FaMapMarkerAlt size={28} className="text-warning me-2" />
              <h5 className="mb-0">Your Address & Rate</h5>
            </div>

            <form onSubmit={onSubmit}>
              {/* Daily Rate */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <FaCoins className="text-warning me-1" />
                  Daily Rate (₹)
                </label>
                <input
                  type="number"
                  className="form-control form-control-lg rounded-pill"
                  placeholder="Enter rate"
                  min="0"
                  value={dailyRate}
                  onChange={e => setDailyRate(e.target.value)}
                />
              </div>

              {/* Address Fields as two-column grid */}
              <div className="row g-3">
                {[
                  ['address', 'Address', 'e.g. 123 Main St'],
                  ['city', 'City', 'City'],
                  ['state', 'State', 'State'],
                  ['serviceArea', 'Service Area', 'Downtown'],
                  ['pinCode', 'Pin Code', '6-digit Pin']
                ].map(([name, label, placeholder]) => (
                  <div key={name} className={name==='address' ? 'col-12' : 'col-md-6'}>
                    <label className="form-label fw-semibold">{label}</label>
                    <input
                      name={name}
                      type={name==='pinCode' ? 'number' : 'text'}
                      className="form-control rounded-pill"
                      placeholder={placeholder}
                      value={address[name]}
                      onChange={handleAddrChange}
                    />
                  </div>
                ))}
              </div>

              {/* Submit */}
              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-warning btn-lg px-5 rounded-pill shadow"
                >
                  Submit Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

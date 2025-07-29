import React from 'react';
import { useNavigate } from 'react-router-dom';

// Simulated backend data
const requests = [
  {
    registration: 'ABC10245',
    brand: 'TATA',
    model: 'Curve',
    variant: 'Second Top',
    ownerName: 'Sanket',
    ownerMobile: '9526235145',
    address: 'Pune, Phase 2',
  },
  {
    registration: 'ABC10294',
    brand: 'Suzuki',
    model: 'Swift',
    variant: 'Base',
    ownerName: 'Rupesh',
    ownerMobile: '97878787542',
    address: 'Hadapsar',
  },
  {
    registration: 'ABC10211',
    brand: 'Hyundai',
    model: 'Creta',
    variant: 'Top',
    ownerName: 'Vivek',
    ownerMobile: '9957767676',
    address: 'Katraj',
  },
];

export default function PendingRequests() {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6  text-center">Car Verification List</h1>
      
      <table className="table table-bordered table-striped text-center mt-5">
        <thead>
          <tr className="border-b-2">
            <th className="p-3 border-2 text-center">Registration Number</th>
            <th className="p-3 border-2 text-center">Brand</th>
            <th className="p-3 border-2 text-center">Model</th>
            <th className="p-3 border-2 text-center">Variant</th>
            <th className="p-3 border-2 text-center">Owner Name</th>
            <th className="p-3 border-2 text-center">Owner Mobile</th>
            <th className="p-3 border-2 text-center">Address</th>
            <th className="p-3 border-2 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.registration} className="border-b-2 hover:bg-gray-50">
              <td className="p-3 border-2 text-center">{req.registration}</td>
              <td className="p-3 border-2 text-center">{req.brand}</td>
              <td className="p-3 border-2 text-center">{req.model}</td>
              <td className="p-3 border-2 text-center">{req.variant}</td>
              <td className="p-3 border-2 text-center">{req.ownerName}</td>
              <td className="p-3 border-2 text-center">{req.ownerMobile}</td>
              <td className="p-3 border-2 text-center">{req.address}</td>
              <td className="p-2 border-2 text-center ">
                <button
                  style={{ backgroundColor: 'red', color: '#fff' }}
                  className="bg-orange-300 hover:bg-orange-400 text-white font-semibold py-0.5 px-2 rounded mx-1 "
                >
                  Reject
                </button>
                <button
                  style={{ backgroundColor: 'green', color: '#fff' }}
                  className="bg-orange hover:bg-orange-600 text-white font-semibold py-0.5 px-2 rounded m-lg-2"
                >
                  Verify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

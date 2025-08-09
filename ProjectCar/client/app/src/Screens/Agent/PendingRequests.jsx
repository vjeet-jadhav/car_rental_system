import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPendingRequests } from '../../Services/agent'; 
import { verifyRequest } from '../../Services/agent'; 
import { rejectRequest } from '../../Services/agent'; 

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getRequests = async () => {
      try {
        const data = await fetchPendingRequests();
        setRequests(data);
      } catch (err) {
        setError('Failed to load pending requests');
      } finally {
        setLoading(false);
      }
    };

    getRequests();
  }, []);

  const handleVerify = async (id) => {
    const confirmed = window.confirm('Do you really want to verify this request?');
    if (!confirmed) return;
  try {
    await verifyRequest(id);
    setRequests((prev) => prev.filter((req) => req.id !== id));
  } catch (err) {
    console.error('Verification failed:', err);
  }
};

const handleReject = async (id) => {
  try {
    const confirmed = window.confirm('Do you really want to reject this request?');
    if (!confirmed) return;

    await rejectRequest(id);
    setRequests((prev) => prev.filter((req) => req.id !== id));
  } catch (err) {
    console.error('Rejection failed:', err);
  }
};


  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Car Verification List</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && requests.length === 0 && (
        <p className="text-center">No pending requests found.</p>
      )}

      {!loading && !error && requests.length > 0 && (
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
                <td className="p-3 border-2 text-center">{req.carNumber}</td>
                <td className="p-3 border-2 text-center">{req.brand}</td>
                <td className="p-3 border-2 text-center">{req.carModel}</td>
                <td className="p-3 border-2 text-center">{req.varient}</td>
                <td className="p-3 border-2 text-center">{req.firstName}</td>
                <td className="p-3 border-2 text-center">{req.mob_num}</td>
                <td className="p-3 border-2 text-center">{req.city}</td>
                <td className="p-2 border-2 text-center">
                  <button
                    style={{ backgroundColor: 'green', color: '#fff' }}
                    className="bg-orange hover:bg-orange-600 text-white font-semibold py-0.5 px-2 rounded m-lg-2"
                    onClick={() => handleVerify(req.id)}
                  >
                    Verify
                  </button>
                  <button
                    style={{ backgroundColor: 'red', color: '#fff' }}
                    className="bg-orange-300 hover:bg-orange-400 text-white font-semibold py-0.5 px-2 rounded mx-1"
                    onClick={() => handleReject(req.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
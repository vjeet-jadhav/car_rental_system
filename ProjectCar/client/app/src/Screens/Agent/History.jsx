import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchHistory } from '../../Services/agent'; 

export default function AgentHistory() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getHistory = async () => {
      try {
        const data = await fetchHistory();
        setRequests(data);

      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getHistory();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">History</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && requests.length === 0 && (
        <p className="text-center">No data available.</p>
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
                <td className="p-3 border-2 text-center">{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
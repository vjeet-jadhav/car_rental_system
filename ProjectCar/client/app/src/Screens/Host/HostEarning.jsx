import React, { useState, useEffect } from 'react';
import { fetchTotalEarnings } from '../../Services/host';

const HostEarning = () => {

  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEarnings = async () => {
      try {
        const data = await fetchTotalEarnings();
        setEarnings(data);
      } catch (err) {
        setError('Failed to load earnings data.');
      } finally {
        setLoading(false);
      }
    };

    loadEarnings();
  }, []);

  return (
    <div className="overflow-x-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center mt-4">
       Total Earnings
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <table className="table table-bordered table-striped text-center mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Brand</th>
              <th className="p-3 border">Model</th>
              <th className="p-3 border">Car Number</th>
              <th className="p-3 border">Total Earning (₹)</th>
            </tr>
          </thead>
          <tbody>
            {earnings.length > 0 ? (
              earnings.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border">{entry.brand}</td>
                  <td className="p-3 border">{entry.carModel}</td>
                  <td className="p-3 border">{entry.carNumber}</td>
                  <td className="p-3 border">₹{entry.earning.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-gray-500">
                  No earnings data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HostEarning;
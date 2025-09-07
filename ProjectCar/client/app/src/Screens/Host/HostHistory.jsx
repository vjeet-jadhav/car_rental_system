import React from 'react';
import { useState, useEffect } from 'react';
import { fetchHistory } from '../../Services/host'; 

const HostHistory = () => {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchHistory();
        setHistory(data);
      } catch (err) {
        setError('Failed to load booking history.');
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);
  return (
    <div className="overflow-x-auto px-4 py-6">
        
      <h2 className="text-3xl font-bold mb-6 text-center mt-4">Car Booking History</h2>
      <table className="table table-bordered table-striped text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">User Name</th>
            <th className="p-3 border">Contact Number</th>
            <th className="p-3 border">Brand</th>
            <th className="p-3 border">Model</th>
            <th className="p-3 border">Car Number</th>
            <th className="p-3 border">Booking Date</th>
            <th className="p-3 border">Start Trip</th>
            <th className="p-3 border">End Trip</th>
            <th className="p-3 border">Amount</th>
          </tr>
        </thead>
        <tbody>
          {history && history.length > 0 ? (
            history.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3 border">{entry.firstName} {entry.lastName}</td>
                <td className="p-3 border">{entry.mob_num}</td>
                <td className="p-3 border">{entry.brand}</td>
                <td className="p-3 border">{entry.carModel}</td>
                <td className="p-3 border">{entry.carNumber}</td>
                <td className="p-3 border">{entry.bookingDate}</td>
                <td className="p-3 border">{new Date(entry.startTrip).toLocaleString()}</td>
                <td className="p-3 border">{new Date(entry.endTrip).toLocaleString()}</td>
                <td className="p-3 border">₹{entry.amount.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="p-4 text-gray-500">No booking history available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export default HostHistory;
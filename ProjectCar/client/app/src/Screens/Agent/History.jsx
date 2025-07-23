import React from 'react';

export default function AgentHistory() {
  return (
    <div className="w-screen h-screen p-4 overflow-auto">
      <h1 className="text-3xl font-bold mb-6  text-center">History</h1>
      <div className="flex space-x-32 mb-6 text-center">
         <button style={{ backgroundColor : '#fb8500' , color : '#fff'}} className="px-4 py-2 bg-orange-500 text-white rounded" disabled>History</button>
         <button style={{ backgroundColor : '#fb8500' , color : '#fff'}} className="px-4 py-2 bg-orange-500 text-white rounded" >Pending Request</button>
         <button style={{ backgroundColor : '#fb8500' , color : '#fff'}} className="px-4 py-2 bg-orange-500 text-white rounded">Profile</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-100 table-auto border-stripped mt-5">
          <thead>
            <tr className="border-b-2">
              <th className="p-2 border-2 text-center">Registration Number</th>
              <th className="p-2 border-2 text-center">Brand</th>
              <th className="p-2 border-2 text-center">Model</th>
              <th className="p-2 border-2 text-center">Variant</th>
              <th className="p-2 border-2 text-center">Owner Name</th>
              <th className="p-2 border-2 text-center">Owner Mobile</th>
              <th className="p-2 border-2 text-center">Address</th>
              <th className="p-2 border-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-2 hover:bg-gray-50">
              <td className="p-2 border-2 text-center">ABC10245</td>
              <td className="p-2 border-2 text-center">TATA</td>
              <td className="p-2 border-2 text-center">Curve</td>
              <td className="p-2 border-2 text-center">Second Top</td>
              <td className="p-2 border-2 text-center">Sanket</td>
              <td className="p-2 border-2 text-center">9526235145</td>
              <td className="p-2 border-2 text-center">Pune, Phase 2</td>
              <td className="p-2 border-2 text-center">Verified</td>
            </tr>
            <tr className="border-b-2 hover:bg-gray-50">
              <td className="p-2 border-2 text-center">ABC10294</td>
              <td className="p-2 border-2 text-center">Suzuki</td>
              <td className="p-2 border-2 text-center">Swift</td>
              <td className="p-2 border-2 text-center">Base</td>
              <td className="p-2 border-2 text-center">Rupesh</td>
              <td className="p-2 border-2 text-center">97878787542</td>
              <td className="p-2 border-2 text-center">Hadapsar</td>
              <td className="p-2 border-2 text-center">Rejected</td>
            </tr>
            <tr className="border-b-2 hover:bg-gray-50">
              <td className="p-2 border-2 text-center">ABC10211</td>
              <td className="p-2 border-2 text-center">Hyundai</td>
              <td className="p-2 border-2 text-center">Creta</td>
              <td className="p-2 border-2 text-center">Top</td>
              <td className="p-2 border-2 text-center">Vivek</td>
              <td className="p-2 border-2 text-center">9957767676</td>
              <td className="p-2 border-2 text-center">Katraj</td>
              <td className="p-2 border-2 text-center">Verified</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
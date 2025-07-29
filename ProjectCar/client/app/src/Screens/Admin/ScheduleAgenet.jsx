import React from "react";

const hostings = [
  {
    id: 1,
    date: "2025-07-20",
    userId: "USR001",
    carId: "CAR1001",
  },
  {
    id: 2,
    date: "2025-07-21",
    userId: "USR002",
    carId: "CAR1002",
  
  },
  {
    id: 3,
    date: "2025-07-22",
    userId: "USR003",
    carId: "CAR1003",

  },
  {
    id: 4,
    date: "2025-07-23",
    userId: "USR004",
    carId: "CAR1004",

  },
  {
    id: 5,
    date: "2025-07-24",
    userId: "USR005",
    carId: "CAR1005",

  },
];

const agents = [
  "Ravi Kumar",
  "Sunita Yadav",
  "Ashok Verma",
  "Deepak Rana",
  "Anjali Nair",
  "Kiran Joshi",
  "Neeraj Singh",
  "Pooja Sharma",
  "Amit Bansal",
  "Meena Patel"
];


function ScheduleAgenet() {
  return (
    <div className="container mt-4">
      <h1 className="mb-3">Schedule Agents</h1>
      <table className="table table-bordered table-striped text-center">
        <thead style={{backgroundColor:'orange'}}>
          <tr>
            <th>Sr. No.</th>
            <th>Date</th>
            <th>User</th>
            <th>Car</th>
            <th>Assign Agent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {hostings.map((hosting, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{hosting.date}</td>
              <td>{hosting.userId}</td>
              <td>{hosting.carId}</td>
              <td>
               <select>
                <option value="">--Assign Agent--</option>
                { agents.map((agent , index) =>(
                  <option key={index} value={agent}> {agent}</option>
                )) }
               </select>
              </td>
              <td>
                <button className="btn btn-success"> Assign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleAgenet;

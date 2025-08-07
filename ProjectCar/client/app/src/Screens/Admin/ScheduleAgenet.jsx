import React, { useEffect, useState } from "react";
import { getAllAgents } from "../../Services/admin";
import { getPendingCars } from "../../Services/admin";




function ScheduleAgenet() {

  const [agents, setAgents] = useState([]);
  const [cars, setCars] = useState([]);

  // console.log(cars);

  const getAgentsAndCars = async () => {

    const agentsResult = await getAllAgents();
    setAgents(agentsResult.data);

    const carResult = await getPendingCars();
    setCars(carResult.data);
  }

  useEffect(() => {
    getAgentsAndCars();
  },[])

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Schedule Agents</h1>
      <table className="table table-bordered table-striped text-center">
        <thead style={{backgroundColor:'orange'}}>
          <tr>
            <th>Sr. No.</th>
            <th>Date</th>
            <th>Number</th>
            <th>RC-Number</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Car-Id</th>
            <th>Assign Agent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={car.id}>
              <td>{index + 1}</td>
              <td>{car.creationDate}</td>
              <td>{car.carNumber}</td>
              <td>{car.rcNumber}</td>
              <td>{car.brand}</td>
              <td>{car.carModel}</td>
              <td>{car.id}</td>
              <td>
               <select>
                <option value="">--Assign Agent--</option>
                { agents.map((agent ) =>(
                  <option key={agent.email} value={agent.firstName}> {agent.firstName} {agent.lastName}</option>
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

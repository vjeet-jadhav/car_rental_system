import React, { useEffect, useState } from "react";
import { getAllAgents } from "../../Services/admin";
import { getPendingCars , assignAgent} from "../../Services/admin";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Components/LoadingSpinner";




function ScheduleAgenet() {

  const [agents, setAgents] = useState([]);
  const [cars, setCars] = useState([]);
  const [agentId, setAgentId] = useState({
    agentId:0
  })
  const [loading, setLoading] = useState(true);

  // console.log(cars);

  const onAssign = async (carId, agentId) =>{

    // console.log(carId,agentId);

    const result = await assignAgent(carId,agentId)

    // console.log(result)
    toast.success(result.data.message);
    await loadCars();
  }

  const loadCars = async () => {

    const carResult = await getPendingCars();
    setCars(carResult.data);
  }
  const getAgents = async () => {

    const agentsResult = await getAllAgents();
    setAgents(agentsResult.data);
  }

  // useEffect(() => {
  //   getAgents();
  //   loadCars();
  // },[])

   useEffect(() => {
    const timer = setTimeout(async () => {
      await getAgents();
      await loadCars();
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if(loading){
    return <LoadingSpinner></LoadingSpinner>;
  }
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
               <select onChange={(e) => setAgentId(e.target.value)}>
                <option value="">--Assign Agent--</option>
                { agents.map((agent ) =>(
                  <option key={agent.id} value={agent.id}> {agent.firstName} {agent.lastName}</option>
                )) }
               </select>
              </td>
              <td>
                <button className="btn btn-success" onClick={() => onAssign(car.id, agentId)}> Assign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleAgenet;

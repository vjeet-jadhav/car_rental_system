import React, { useEffect, useState } from "react";
import '../../assets/Admin.css'
import { getCarsInfoApi } from "../../Services/admin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { restrictCarApi } from "../../Services/admin";


const carsData = [
  { id: 1, carNo: "MH12AB1234", userNo: "101", rating: 4.2, bookings: 102 , earnings: 5000 },
  { id: 2, carNo: "DL8CA2345", userNo: "102", rating: 4.8, bookings: 11 , earnings: 7000 },
  { id: 3, carNo: "KA05CZ5678", userNo: "103", rating: 3.9, bookings: 57 , earnings: 4500 },
  { id: 4, carNo: "TN10XY1234", userNo: "104", rating: 4.0, bookings: 100 , earnings: 6200 },
];

const CarList = () => {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sorted = [...cars];

    switch (option) {
      case "rating-asc":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      case "rating-desc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "earnings-asc":
        sorted.sort((a, b) => a.income - b.income);
        break;
      case "earnings-desc":
        sorted.sort((a, b) => b.income - a.income);
        break;
      case "bookings-asc":
        sorted.sort((a, b) => a.bookings - b.bookings);
        break;
      case "bookings-desc":
        sorted.sort((a, b) => b.bookings - a.bookings);
        break;
      default:
        sorted = cars; // reset
        break;
    }

    setCars(sorted);
  };


  const filteredCars = cars.filter(
    (car) =>
      car.carNumber.toLowerCase().includes(search.toLowerCase()) ||
      car.id.toString().includes(search)
  );

  const getCarsInfo = async () => {
    const result = await getCarsInfoApi();

    setCars(result.data)
  }

  const restrictCar = async (id) =>{
    const result = await restrictCarApi(id);
    if(result){
      toast.success("Car restricted Successfully !")
      // navigate("/admin");
      getCarsInfo();
    }
  }
  useEffect(() =>{
    getCarsInfo();
  },[])

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Car & Users</h1>

      <div className="d-flex mb-3 gap-3 align-items-center">
        <input
          type="text"
          className="form-control fw-bolder"
          placeholder="Search by Car No. or Car Id."
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
          style={{backgroundColor : '#fff' , border: "1px solid red" }}
        />

        <select
          value={sortOption}
          onChange={handleSortChange}
          className="form-select w-auto fw-bold "
          style={{backgroundColor : '#fff',border: "1px solid red"  }}
        >
          <option value="">-- Sort By --</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="earnings-desc">Earnings: High to Low</option>
          <option value="earnings-asc">Earnings: Low to High</option>
          <option value="bookings-asc">Bookings: Low to High</option>
          <option value="bookings-desc">Bookings: High to Low</option>
        </select>
      </div>

      <table className="table table-bordered table-striped text-center"  >
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Car ID.</th>
            <th>Car No.</th>
            <th>Date</th>
            <th>Brand</th>
            <th>Rating</th>
            <th>Bookings</th>
            <th>Earnings</th>
            <th>Restrict</th>
          </tr>
        </thead>
        <tbody>
          {filteredCars.map((car, index) => (
            <tr
              key={car.id}
            >
              <td>{index + 1}</td>
              <td>{car.id}</td>
              <td>{car.carNumber}</td>
              <td>{car.creationDate}</td>
              <td>{car.brand}</td>
              <td>{car.rating}</td>
              <td>{car.bookings}</td>
              <td>{car.income}</td>
              <td className="">
                <button className="btn btn-danger" onClick={() => restrictCar(car.id)}>Restrict</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
};

export default CarList;

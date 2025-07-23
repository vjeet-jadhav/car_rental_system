import React, { useState } from "react";
import '../../assets/Admin.css'


const carsData = [
  { id: 1, carNo: "MH12AB1234", userNo: "101", rating: 4.2, bookings: 102 , earnings: 5000 },
  { id: 2, carNo: "DL8CA2345", userNo: "102", rating: 4.8, bookings: 11 , earnings: 7000 },
  { id: 3, carNo: "KA05CZ5678", userNo: "103", rating: 3.9, bookings: 57 , earnings: 4500 },
  { id: 4, carNo: "TN10XY1234", userNo: "104", rating: 4.0, bookings: 100 , earnings: 6200 },
];

const CarList = () => {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [cars, setCars] = useState(carsData);

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
        sorted.sort((a, b) => a.earnings - b.earnings);
        break;
      case "earnings-desc":
        sorted.sort((a, b) => b.earnings - a.earnings);
        break;
      case "bookings-asc":
        sorted.sort((a, b) => a.bookings - b.bookings);
        break;
      case "bookings-desc":
        sorted.sort((a, b) => b.bookings - a.bookings);
        break;
      default:
        sorted = carsData; // reset
        break;
    }

    setCars(sorted);
  };

  const filteredCars = cars.filter(
    (car) =>
      car.carNo.toLowerCase().includes(search.toLowerCase()) ||
      car.userNo.includes(search)
  );

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Car List</h3>

      <div className="d-flex mb-3 gap-3 align-items-center">
        <input
          type="text"
          className="form-control fw-bolder"
          placeholder="Search by Car No. or User No."
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
          style={{backgroundColor : '#fb8500' }}
        />

        <select
          value={sortOption}
          onChange={handleSortChange}
          className="form-select w-auto fw-bolder "
          style={{backgroundColor : '#fb8500' }}
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

      <table className="table table-bordered table-striped text-center " >
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>User No.</th>
            <th>Car No.</th>
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
              <td>{car.userNo}</td>
              <td>{car.carNo}</td>
              <td>{car.rating}</td>
              <td>{car.bookings}</td>
              <td>{car.earnings}</td>
              <td className="">
                <button className="btn btn-danger">Restrict</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarList;

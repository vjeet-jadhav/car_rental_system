import React from "react";
// import "./style.css"; // Keep if you have custom styles
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllBasicInfo } from "../../Services/admin";


export const Component = () => {

  
  const [info ,setInfo] = useState(
    {
    totalUsers: 0,
    totalCars: 0,
    totalHosts: 0,
    totalRevenue: 0.0,
    totalBookings: 0,
    totalRating: 0.0

  });
  const cards = [
    {
      title: "Total Cars",
      value: `${info.totalCars}`,
      color: "primary",
      percent: "12%",
      note: "since last month",
      icon: "🚗",
    },
    {
      title: "Total Users",
      value:  `${info.totalUsers}`,
      color: "indigo",
      percent: "8.3%",
      note: "since last month",
      icon: "👥",
    },
    {
      title: "Total Hosts",
      value:  `${info.totalHosts}`,
      color: "warning",
      percent: "5.4%",
      note: "since last month",
      icon: "🧑‍💼",
    },
    {
      title: "Total Revenue",
      value: `$${info.totalRevenue}`,
      color: "success",
      percent: "16.2%",
      note: "since last month",
      icon: "💰",
    },
    {
      title: "Active Bookings",
      value:  `${info.totalBookings}`,
      color: "danger",
      percent: "4.7%",
      note: "since last month",
      icon: "📅",
    },
    {
      title: "Average Rating",
      value:  `${info.totalRating.toFixed(2)}`,
      color: "info",
      percent: "628 reviews",
      note: "based on",
      icon: "⭐",
    },
  ];


  const getBasicInfo = async () =>{

    const result = await getAllBasicInfo();

    setInfo(result.data)
    
  }

  // useEffect(() =>{
  //   getBasicInfo();
  // },[]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getBasicInfo();
    }, 500);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="container my-5" >
      <div className="row g-4" >
        {cards.map((card, idx) => (
          <div className="col-sm-12 col-md-2 " key={idx} >
            <div className="card border-1" style={{ border: "2px solid red" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="card-title fw-bold mb-3">{card.value}</h5>
                    <hr></hr>
                    <p className="card-subtitle text-muted">{card.title}</p>
                  </div>
                  <div className="bg-white bg-opacity-10 p-3 rounded-circle " style={{height:'50px'}}>
                    <span className="fs-1 " >{card.icon}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

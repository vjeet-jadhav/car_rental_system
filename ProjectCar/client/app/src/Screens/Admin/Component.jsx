import React from "react";
// import "./style.css"; // Keep if you have custom styles

export const Component = () => {
  const cards = [
    {
      title: "Total Cars",
      value: "254",
      color: "primary",
      percent: "12%",
      note: "since last month",
      icon: "🚗",
    },
    {
      title: "Total Users",
      value: "1,523",
      color: "indigo",
      percent: "8.3%",
      note: "since last month",
      icon: "👥",
    },
    {
      title: "Total Hosts",
      value: "86",
      color: "warning",
      percent: "5.4%",
      note: "since last month",
      icon: "🧑‍💼",
    },
    {
      title: "Total Revenue",
      value: "$42,580",
      color: "success",
      percent: "16.2%",
      note: "since last month",
      icon: "💰",
    },
    {
      title: "Active Bookings",
      value: "968",
      color: "danger",
      percent: "4.7%",
      note: "since last month",
      icon: "📅",
    },
    {
      title: "Average Rating",
      value: "4.8",
      color: "info",
      percent: "628 reviews",
      note: "based on",
      icon: "⭐",
    },
  ];

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

import React, { useState } from "react";
import { getUserApi } from "../../Services/admin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { restrictUserApi } from "../../Services/admin";

export const UserDetails = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mob_num: 0,
    id: 0,
    city: "",
    state: "",
    remark: ""
  });

  const [email , setEmail] = useState("");
  const navigate = useNavigate();
  // console.log(user)
  const onSearch = async () =>{

    const result = await getUserApi(email);
    // console.log(result);
    setUser(result.data)
  }

  const onRestrict = async () =>{
    const result = await restrictUserApi(user.remark,user.id)
    if(result){
      toast.success("User Restricted Successfully !");
      navigate("/admin")
    }
  }
  return (
    <div className="container my-5 p-4 rounded shadow" style={{ backgroundColor: "#fff", maxWidth: "400px" }} >
        <div className="card-body">
          {/* Email Search */}
          <h3 className="mb-4"><b>Restrict User </b></h3>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-group">
              <input
                type="email"
                id="email"
                placeholder="Enter user email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn " onClick={()=>onSearch()} style={{backgroundColor:'rgba(248, 91, 60, 1)',color :"white" }}>
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>

          {/* User Details */}
          <div className=" p-4 rounded border mb-4">
            <h2 className="h5 border-bottom pb-2 mb-3">User Details</h2>
            <div className="row g-3">
              <div className="col-md-6 col-lg-4">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  readOnly
                  value={user.firstName}
                  className="form-control-plaintext bg-light border rounded px-2"
                  placeholder="first Name"
                />
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  readOnly
                  value={user.lastName}
                  className="form-control-plaintext bg-light border rounded px-2"
                  placeholder="Last Name"
                />
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  readOnly
                  value={user.email}
                  className="form-control-plaintext bg-light border rounded px-2"
                  placeholder="Email"
                />
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  readOnly
                  value={user.mob_num}
                  className="form-control-plaintext bg-light border rounded px-2"
                  placeholder="0000-00-0000"
                />
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="form-label">Id</label>
                <input
                  type="text"
                  readOnly
                  value={user.id}
                  className="form-control-plaintext bg-light border rounded px-2"
                  placeholder="Id"
                />
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="form-label">city</label>
                <input
                  type="text"
                  readOnly
                  value={user.city}
                  className="form-control-plaintext bg-light border rounded px-2"
                  placeholder="City"
                />
              </div>
              <div className="col-12">
                <label className="form-label">State</label>
                <input
                  type="text"
                  readOnly
                  value={user.state}
                  className="form-control-plaintext bg-light border rounded px-2"
                  placeholder="State"
                />
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="mb-4">
            <label htmlFor="remarks" className="form-label">
              Remarks
            </label>
            <textarea
              id="remark"
              rows="3"
              placeholder="Enter remarks for this user..."
              className="form-control"
              value={user.remark}
              onChange={(e) =>
                setUser({ ...user, remark: e.target.value })
              }
            ></textarea>
          </div>

          {/* Action Button */}
          <div className="text-end d-flex align-content-center justify-content-center">
            <button className="btn  d-flex align-items-center gap-2 shadow-sm" onClick={() => onRestrict()} style={{backgroundColor:'rgba(248, 91, 60, 1)',color :"white" }}>
              Restrict User
            </button>
          </div>
        </div>
    </div>
  );
};

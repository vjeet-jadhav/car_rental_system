import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

  const navigate = useNavigate();

  // go back to previous page

   const handleCancel = () => {
    navigate(-1); 
  };

  return (
    <>
    <h1 className="mb-3 text-center mt-5">Edit Profile</h1>
    <div
      className="card  "
      style={{
        borderRadius: '.5rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        maxWidth: '400px',
        backgroundColor: '#fff',
        marginTop:'50px',
        alignSelf:'center',
        justifySelf:'center'
      }}
    >
      <div className="row g-0">
        <div
          className="col-md-4 text-center text-white px-2 pt-3"
          style={{
            background: 'linear-gradient(to right bottom, rgba(252, 210, 72, 1), rgba(248, 91, 60, 1))',
            borderTopLeftRadius: '.5rem',
            borderBottomLeftRadius: '.5rem'
          }}
        >
          <img
            src="/Image/user.png"
            alt="Avatar"
            className="img-fluid my-3 bg-white rounded-circle p-2"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
          <input type="file" className="form-control form-control-sm my-2 px-2" />
        </div>

        <div className="col-md-8">
          <div className="card-body p-3">
            <h6>Profile Details</h6>
            <hr className="mt-0 mb-3" />

            <div className="row">
              <div className="col-6 mb-3">
                <input type="text" className="form-control" placeholder="First Name" />
              </div>
              <div className="col-6 mb-3">
                <input type="text" className="form-control" placeholder="Last Name" />
              </div>
            </div>

            <input type="email" className="form-control mb-3" placeholder="Email" />
            <input type="tel" className="form-control mb-3" placeholder="Mob No." />

            <div className="d-flex justify-content-center">
               <button  className="btn btn-secondary w-50 m-1" onClick={handleCancel} style={{ backgroundColor: '#ff5e00ff', border: 'none' }}>
                Cancel
              </button>

              <button className="btn btn-primary w-50 m-1" style={{ backgroundColor: '#ff5e00ff', border: 'none' }}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

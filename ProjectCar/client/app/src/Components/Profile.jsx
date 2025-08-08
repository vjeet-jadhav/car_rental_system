import React, {useEffect,  useState} from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUserInfo } from '../Services/user';

export default function Profile() {

    const navigate = useNavigate();

  const[user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mob_num: ""
  })

    const loadUserDetails = async () => {
    try {
      const result = await getUser();
      console.log(result)

      if (result.status === 200) {

        setUser({
          firstName: result.data.firstName || "",
          lastName: result.data.lastName  || "",
          email: result.data.email        || "",
          mob_num: result.data.mob_num     || ""
        });
      } else {
        toast.error(result.error || 'Failed to load user');
      }
    } catch (err) {
      toast.error('Error while loading user details');
      console.error(err);
    }
  };

  const handleSave = async () => {

    
    try {
      const result = await updateUserInfo(
        user.firstName,
        user.lastName,
        user.email,
        user.mob_num
      );

      if (result.status === 200) {
        toast.success('Profile updated successfully');
        navigate(-1);
      } else {
        toast.error(result.error || 'Update failed');
      }
    } catch (err) {
      toast.error('Something went wrong while updating');
      console.error(err);
    }
  };

  useEffect(() => {
  loadUserDetails();
  }, []); 

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
                <input type="text" value={user.firstName} className="form-control" placeholder="First Name" 
                onChange={e => setUser({ ...user, firstName: e.target.value})} />
              </div>
              <div className="col-6 mb-3">
                <input type="text" value={user.lastName} className="form-control" placeholder="Last Name" 
                onChange={(e) => setUser(prev => ({ ...user, lastName: e.target.value}))}/>
              </div>
            </div>

            <input type="email" value={user.email} className="form-control mb-3" placeholder="Email" 
            onChange={(e) => setUser({ ...user, email: e.target.value})}/>
            <input type="tel" value={user.mob_num} className="form-control mb-3" placeholder="Mob No." 
            onChange={(e) => setUser({ ...user, mob_num: e.target.value})}/>

            <div className="d-flex justify-content-center">
               <button  className="btn btn-secondary w-50 m-1" onClick={handleCancel} style={{ backgroundColor: '#ff5e00ff', border: 'none' }}>
                Cancel
              </button>

              <button className="btn btn-primary w-50 m-1" style={{ backgroundColor: '#ff5e00ff', border: 'none' }}
              onClick={handleSave}>
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

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Users.css';
import BasicModal from '../../constants/Modal';


const UserDetails = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
 

  useEffect(() => {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    fetch(`https://sewzee.onrender.com/api/admin/user/${id}`, { headers })
      .then((response) => response.json())
      .then((data) => setUser(data.data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, [id]);

  


  return (
    <>
    <div className="basic-modal-container">  
    <BasicModal modalData={user} className="basic-modal" /> 
    </div>
    <div className="user-details-container">
      <div className="user-details">
        <h2>User Details</h2>
        {user ? (
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>Date of Birth:</strong> {user.dob}
            </p>
            <p>
              <strong>Total Orders:</strong> {user.total_orders}
            </p>
            <p>
              <strong>Marketplace:</strong> {user.marketplace}
            </p>
            {/* Add more user data properties here */}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>

      {/* BasicModal component */}
    </div>
     </>
  );
};

export default UserDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Drivers.css"; 




const DriverDetails = () => {
  const [driver, setDriver ] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    fetch(`https://sewzee.onrender.com/api/admin/driver/${id}`, { headers })
      .then((response) => response.json())
      .then((data) => setDriver (data.data))
      .catch((error) => console.error('Error fetching driver data:', error));
  }, [id]);
  return (
    <>
    <div className="drivers-details-container2">
      <div className="drivers-details">
        <h2>Driver Details</h2>
        {driver ? (
          <div>
            {/* <img
                  src={driver.logo}
                //   alt={`Image of ${tailor.name}`}
                  className="driver-image"
                /> */}
            <p>
              <strong>Name:</strong> {driver.name}
            </p>
            <p>
              <strong>Email:</strong> {driver.email}
            </p>
            <p>
              <strong>Address:</strong> {driver.address}
            </p>
            <p>
              <strong>Number:</strong> {driver.number}
            </p>
            
            <p>
              <strong>Seller:</strong> {driver.seller}
            </p>
            <p>
              <strong>Website:</strong> {driver.website}
            </p>
            
          </div>
        ) : (
          <p>Loading driver data...</p>
        )}
      </div>    
    </div>
     </>
  );
};

export default DriverDetails;

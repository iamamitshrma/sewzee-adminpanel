import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Brands.css';



const BrandDetails = () => {
  const [brand, setBrand] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    fetch(`https://sewzee.onrender.com/api/admin/brand/${id}`, { headers })
      .then((response) => response.json())
      .then((data) => setBrand(data.data))
      .catch((error) => console.error('Error fetching brand data:', error));
  }, [id]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setPushNotificationData((prevData) => ({
  //     ...prevData,
  //     [name]: value
  //   }));
  // };

  // const handleSendPushNotification = () => {
  //   const token = localStorage.getItem('token');

  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   };

  //   fetch('https://sewzee.onrender.com/api/admin/pushNotification', {
  //     method: 'POST',
  //     headers: headers,
  //     body: JSON.stringify(pushNotificationData)
  //   })
  //     .then((response) => {
  //       // Handle successful response, e.g., show a success message
  //       console.log('Push notification sent successfully!');
  //     })
  //     .catch((error) => {
  //       // Handle error, e.g., show an error message
  //       console.error('Error sending push notification:', error);
  //     });
  // };

  return (
    <>
    <div className="brand-details-container2">
      <div className="brand-details">
        <h2>Brand Details</h2>
        {brand ? (
          <div>
            {/* <img
                  src={brand.logo}
                //   alt={`Image of ${tailor.name}`}
                  className="brand-image"
                /> */}
            <p>
              <strong>Name:</strong> {brand.name}
            </p>
            <p>
              <strong>Email:</strong> {brand.email}
            </p>
            <p>
              <strong>Address:</strong> {brand.address}
            </p>
            <p>
              <strong>Number:</strong> {brand.number}
            </p>
            
            <p>
              <strong>Seller:</strong> {brand.seller}
            </p>
            <p>
              <strong>Website:</strong> {brand.website}
            </p>
            {/* Add more brand data properties here */}
          </div>
        ) : (
          <p>Loading brand data...</p>
        )}
      </div>    
    </div>
     </>
  );
};

export default BrandDetails;

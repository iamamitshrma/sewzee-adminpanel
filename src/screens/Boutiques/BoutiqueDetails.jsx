import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Boutiques.css';


const BoutiqueDetails = () => {
  const [boutique, setBoutique] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    fetch(`https://api.sewzee.shop/api/admin/boutique/${id}`, { headers })
      .then((response) => response.json())
      .then((data) => setBoutique(data.data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, [id]);

  return (
    <>
    <div className="boutique-details-container2">
      <div className="boutique-details">
        <h2>Boutique Details</h2>
        {boutique ? (
          <div>
    
            <p>
              <strong>Name:</strong> {boutique.name}
            </p>
            <p>
              <strong>Email:</strong> {boutique.email}
            </p>
            <p>
              <strong>Address:</strong> {boutique.address}
            </p>
            <p>
              <strong>Number:</strong> {boutique.number}
            </p>
            
            <p>
              <strong>Seller:</strong> {boutique.seller}
            </p>
            <p>
              <strong>Website:</strong> {boutique.website}
            </p>
            {/* Add more boutique data properties here */}
          </div>
        ) : (
          <p>Loading boutique data...</p>
        )}
      </div>
    </div>
     </>
  );
};

export default BoutiqueDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Tailors.css';


const TailorDetails = () => {
  const [tailor, setTailor] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    fetch(`https://sewzee.onrender.com/api/admin/tailor/${id}`, { headers })
      .then((response) => response.json())
      .then((data) => setTailor(data.data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, [id]);

  return (
    <>
    <div className="tailor-details-container">
      <div className="tailor-details">
        <h2>Tailor Details</h2>
        {tailor ? (
          <div>
                {/* <img
                  src={tailor.image}
                //   alt={`Image of ${tailor.name}`}
                  className="tailor-image"
                /> */}
            <p>
              <strong>Name:</strong> {tailor.name}
            </p>
            <p>
              <strong>Rating:</strong> {tailor.rating}
            </p>
            <p>
              <strong>Address:</strong> {tailor.address}
            </p>
            <p>
              <strong>Number:</strong> {tailor.number}
            </p>
            
            <p>
              <strong>Store  Name:</strong> {tailor.business_name}
            </p>
            <p>
              <strong>Stich Perference:</strong> {tailor.perference}
            </p>
            {/* Add more tailor data properties here */}
          </div>
        ) : (
          <p>Loading tailor data...</p>
        )}
      </div>
    </div>
     </>
  );
};

export default TailorDetails;

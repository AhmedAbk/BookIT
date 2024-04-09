import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Packres = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/test/${id}`);
        const data = await response.json();
        console.log(id);
       
        console.log(data);
        if (response.ok) {
          setSelectedCity(data);
        } else {
          setError(`Error: ${data.message || 'Failed to fetch'}`);
        }
      } catch (error) {
        setError(`Error fetching city: ${error.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
    
  }, [id]);

  const renderCityDetails = () => {
    if (selectedCity) {
      return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 mb-4">
              <img src={selectedCity.image} className="img-fluid" alt={selectedCity.name} />
            </div>
            <div className="col-md-6">
              <h2 className="mb-4">{selectedCity.name}</h2>
              <p>{selectedCity.description}</p>
              <h4 className="mt-4">Package Details:</h4>
              <ul>
                <li>Duration: {selectedCity.duration}</li>
                <li>Prices starting from {selectedCity.prices} $</li>
              </ul>
              <Link to='/Reg'>
              <button className="btn btn-primary mt-3"  >
                book now
              </button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-3 pb-3">
            <h6 className="text-primary text-uppercase" style={{ letterSpacing: '5px' }}>Packages</h6>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {renderCityDetails() || (
                <p>Error: {error || 'City not found'}</p>
                
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Packres;

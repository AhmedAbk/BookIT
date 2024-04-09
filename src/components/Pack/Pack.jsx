import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Packres from './Packres';

function Pack() {
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/cities');
        const data = await res.json();
        setCity(data.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCity();
  }, []);

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };


  return (
    <div>
    {/* Packages Start */}
    <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-3 pb-3">
            <h6 className="text-primary text-uppercase" style={{ letterSpacing: '5px' }}>
              Packages
            </h6>
            <h1>Explore Top Packages</h1>
          </div>
          <div className="row">
            {city.map((city) => (
              <div className="col-lg-4 col-md-6 mb-4" key={city.id}>
                <div
                  className="package-item bg-white mb-2"
                  onClick={() => handleCityClick(city)}
                >
                  <Link to={`/Pack/${city.id}`}>
                    <img
                      className="img-fluid"
                      src={city.image}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                      alt={city.name}
                    />
                <div className="p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2" />{city.name}</small>
                    <small className="m-0"><i className="fa fa-calendar-alt text-primary mr-2" />{city.duration}</small>
                    <small className="m-0"><i className="fa fa-user text-primary mr-2" />{city.person}</small>
                  </div>
                  <div className="h5 text-decoration-none">Visit {city.name}</div>
                  <div className="border-top mt-4 pt-4">
                      <div className="d-flex justify-content-between">
                        <h6 className="m-0"><i className="fa fa-star text-primary mr-2" />{city.rating} <small>{city.review}</small></h6>
                        <h5 className="m-0">{city.prices}</h5>
                      </div>
                   </div>
                </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    
      {selectedCity && <Packres id={selectedCity.id} />}

    </div>
  )
}

export default Pack
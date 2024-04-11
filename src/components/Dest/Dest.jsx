import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Destres from './destres';

function Dest() {
  const [categories, setcategories] = useState([]);
  const [selectedcategories, setSelectedcategories] = useState(null);
  
  useEffect(() => {
    const fetchcategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/allcategories');
        const data = await response.json();
        setcategories(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchcategories();
  }, []);

  const handlecategoriesClick = (categories) => {
    setSelectedcategories(categories);
  };

  return (
    <div>
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-3 pb-3">
            <h6 className="text-primary text-uppercase" style={{ letterSpacing: '5px' }}>
              categories
            </h6>
            <h1>Explore Top categories</h1>
          </div>
          <Link to={`/Dest/${categories.catid}`}>
          <div className="row">
            {categories.map((categories) => (
              <div className="col-lg-4 col-md-6 mb-4" key={categories.catid}>
                <div
                  className="destination-item position-relative overflow-hidden mb-2"
                  onClick={() => handlecategoriesClick(categories)}
                > 
          
                    <img
                      className="img-fluid"
                      src={categories.catimage}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                      alt={categories.catname}
                    />
                   
                  
                  <div className="destination-overlay text-white text-decoration-none">
                      <h5 className="text-white">{categories.catname}</h5>
                    </div>
                  </div>
                </div>
            
   
            ))}
          </div>
          </Link>
        </div>
      </div> 
      {selectedcategories && <Destres />}
    </div>
  );
}

export default Dest;

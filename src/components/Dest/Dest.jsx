import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Destres from './Destres';

function Dest() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/allcategories');
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-3 pb-3">
            <h6 className="text-primary text-uppercase" style={{ letterSpacing: '5px' }}>
              Categories
            </h6>
            <h1>Explore Top Categories</h1>
          </div>
          <div className="row">
            {categories.map((category) => (
              <div className="col-lg-4 col-md-6 mb-4" key={category.catid}>
                <Link to={`/Dest/${category.catid}`} className="text-decoration-none">
                  <div
                    className="destination-item position-relative overflow-hidden mb-2"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <img
                      className="img-fluid"
                      src={category.catimage}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                      alt={category.catname}
                    />
                    <div className="destination-overlay text-white text-decoration-none">
                      <h5 className="text-white">{category.catname}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedCategory && <Destres /> }
    </div>
  );
}

export default Dest;

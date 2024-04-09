import React from 'react';

const SearchResultItem = ({ city, description }) => {
  return (
    <div className='row'>
      <div className="col-lg-4 col-md-6 mb-2 mx-auto ">  
        <div className="package-item bg-white mb-2" > 
          <img className="img-fluid" src={`./src/assets/img/${city.toLowerCase()}.jpg`} alt="" />
          <div className="p-2"> 
            <div className="d-flex justify-content-between mb-2" > 
              <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-1" />{city}</small> 
            </div>
            <a className="h6 text-decoration-none" href>{description}</a>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;

import React from 'react';
import './side.css';
import { Link } from 'react-router-dom';
function Side() {
  const destinations = [
    { name: 'United States', cities: ['Miami', 'Los Angeles'] },
    { name: 'United Kingdom', cities: ['London', 'York'] },
    { name: 'France', cities: ['Paris', 'Cote Azur'] },
    { name: 'Australia', cities: ['Sydney', 'Savannah'] },
    { name: 'Africa', cities: ['Tunisia', 'Madagascar'] },
    { name: 'Asia', cities: ['Japan', 'Thailand'] },
  ];

  return (
    <div className='sidenav'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 mb-4 sidebar">
            <h4 className="sidebar-header text-white">TRAVELIO</h4>
            <ul className="list-unstyled components">
              <Link to='/Pack'>
              <li>
                <a href="#">Packages</a>
              </li>
              </Link>
              <li>
              <Link to='/Dest'> <a href="#">Destination</a></Link>
                <ul className="list-unstyled">
                  {destinations.map((destination, index) => (
                    <li key={index}>
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        {destination.name}
                      </a>
                      <ul className="dropdown-menu dropdown-menu-right">
                        {destination.cities.map((city, cityIndex) => (
                          <li key={cityIndex}>
                            <a href="#">{city}</a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li> 
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Side;

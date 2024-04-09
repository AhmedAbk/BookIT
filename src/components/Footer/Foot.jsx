import React from 'react'

function Foot() {
  return (
    <div>
    {/* Footer Start */} 
    <div className="container-fluid bg-dark text-white-50 py-0  px-sm-3 px-lg-5" style={{marginTop: '0px'}}>
      <div className="row pt-5">
        <div className="col-lg-3 col-md-6 mb-5">
          <a href className="navbar-brand">
            <h1 className="text-primary"><span className="text-white">BOOK</span>IO</h1>
          </a>
          <p>Read with us</p>
        
        </div>
         
        <div className="col-lg-3 col-md-6 mb-5">
          <h5 className="text-white text-uppercase mb-4" style={{letterSpacing: '5px'}}>Contact Us</h5>
          <p><i className="fa fa-map-marker-alt mr-2" />14 Street of Sousse, Gbelli, Tunisa</p>
          <p><i className="fa fa-phone-alt mr-2" />+216 99547060</p>
          <p><i className="fa fa-envelope mr-2" />ahmedabkw1@gmail.com</p>
        </div>
      </div>
    </div>
    {/* Footer End */}</div>
  )
}

export default Foot
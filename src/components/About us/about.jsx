import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="container-fluid py-5">
        <div className="container pt-5">
          <div className="row">
            <div className="col-lg-6" style={{minHeight: '500px'}}>
              <div className="position-relative h-100">
                <img className="position-absolute w-100 h-100" style={{objectFit: 'cover', backgroundImage: `url(https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D)`}} />
              </div>
            </div>
            <div className="col-lg-6 pt-5 pb-lg-5">
              <div className="about-text bg-white p-4 p-lg-5 my-lg-5">
                <h6 className="text-primary text-uppercase" style={{letterSpacing: '5px'}}>About Us</h6>
                <h1 className="mb-3">We Provide Best books In Your Budget</h1>
                <p>Welcome to BOOKIO, your virtual gateway to a world of literary delights. Nestled within the digital realm, our bookstore is where bookworms roam, imagination flourishes, and stories come to life with just a click of a button.</p>
                <div className="row mb-4">
                  <div className="col-6">
                    <img className="img-fluid" src="img/about-1.jpg" alt="" />
                  </div>
                  <div className="col-6">
                    <img className="img-fluid" src="img/about-2.jpg" alt="" />
                  </div>
                </div>
                <Link to='/Contact'>
                <a href className="btn btn-primary mt-1">Contact us Now</a>
                </Link>
             
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default About
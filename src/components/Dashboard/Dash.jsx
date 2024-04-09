import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GetAllCity from '../admin/getallcity';
import GetAllDest from '../admin/getalldest';

async function getIncomeData() {
  try {
    const response = await fetch('http://localhost:3001/stats/income');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching income data:', error);
    throw error; 
  }
}

async function getDestData() {
  try {
    const response = await fetch('http://localhost:3001/stats/dests');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching destination data:', error);
    throw error; 
  }
}

async function getCitiesData() {
  try {
    const response = await fetch('http://localhost:3001/stats/cities');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cities data:', error);
    throw error; 
  }
}

async function getUsersData() {
  try {
    const response = await fetch('http://localhost:3001/stats/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users data:', error);
    throw error;  
  }
}

function Dash() {
  const [incomeValue, setIncomeValue] = useState('');
  const [destValue, setDestValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [userValue, setUserValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const income = await getIncomeData();
        setIncomeValue(income[0].income);

        const dest = await getDestData();
        setDestValue(dest[0].numofdests);
        
        const city = await getCitiesData();
        setCityValue(city[0].numofcites); 


        const user = await getUsersData();
        setUserValue(user[0].numofusers);
      } catch (error) {
        console.error('Error fetching data:', error); 
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="sidebar">
              <ul>
                <li>
                  <Link to="/AddDest">Destinations</Link>
                </li>
                <li>
                  <Link to='/AddCity'>Packages</Link>
                </li>
                <li>
                  <Link to='/Users'>Users</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-9">
            <h2>Admin Dashboard</h2>
            <div className="row">
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Income</h5>
                    <p className="card-text">{incomeValue}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Destination</h5>
                    <p className="card-text">{destValue}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Cities</h5>
                    <p className="card-text">{cityValue}</p>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Users</h5>
                    <p className="card-text">{userValue}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <GetAllDest />
        </div>
        <div className="col-md-6">
          <GetAllCity />
        </div>
      </div>
      
    </div>
  );
}

export default Dash;

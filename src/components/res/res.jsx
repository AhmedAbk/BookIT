import React, { useState, useEffect } from 'react';

function Res() {
  const [formData, setFormData] = useState({
    full_name: '',
    nb_person: 0,
    start_date: '',
    end_date: '',
    price: 0,
    city_id: 0
  });

  const [cities, setCities] = useState([]);

  useEffect(() => { 
    fetchCities();
  }, []); 

  const fetchCities = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/allcitiees');
      if (!response.ok) {
        throw new Error('Failed to fetch cities');
      }
      const citiesData = await response.json();
      setCities(citiesData);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCityChange = (e) => {
    const selectedCityId = parseInt(e.target.value);
    const selectedCity = cities.find(city => city.id === selectedCityId);
    if (selectedCity) {
      setFormData({ ...formData, city_id: selectedCityId, price: selectedCity.prices });
    }
  };

  const handleReservation = async (event) => {
    event.preventDefault();
    try {
      const totalPrice = formData.price * formData.nb_person;
      const dataToSend = { ...formData, price: totalPrice };
      const response = await fetch('http://localhost:3001/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error('Failed to submit reservation');
      } 
      setFormData({
        full_name: '',
        nb_person: 0,
        start_date: '',
        end_date: '',
        price: 0,
        city_id: 0
      });

      alert('Reservation submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit reservation. Please try again.');
    }
  };

  const handlePersonChange = (e) => {
    const nb_person = parseInt(e.target.value);
    const totalPrice = formData.price * nb_person;
    setFormData({ ...formData, nb_person, price: totalPrice });
  };

  return (
    <div className="container mt-5">
      <h2>Reservation Form</h2>
      <form onSubmit={handleReservation}>
        <div className="mb-3">
          <label htmlFor="full_name" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="full_name"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            placeholder="Enter Full Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nb_person" className="form-label">Number of Persons</label>
          <input
            type="number"
            className="form-control"
            id="nb_person"
            value={formData.nb_person}
            onChange={handlePersonChange}
            placeholder="Enter Number of Persons"
          />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="start_date" className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="start_date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="end_date" className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              id="end_date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            placeholder="Enter Price"
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city_id" className="form-label">City</label>
          <select
            className="form-select"
            id="city_id"
            value={formData.city_id}
            onChange={handleCityChange}
          >
            <option value={0}>Select a city</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Res;

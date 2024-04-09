import React, { useState } from 'react';

function AddCity({ onAddCity }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    image: '',
    prices: '',
    description: '',
    duration: '',
    person: '',
    rating: '',
    reviews: '',
    destid: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/addcities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newCity = await response.json();
        onAddCity(newCity); 
        setFormData({
          id: '',
          name: '',
          image: '',
          prices: '',
          description: '',
          duration: '',
          person: '',
          rating: '',
          reviews: '',
          destid: '',
        });
      } else { 
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) { 
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New City</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="cityId">ID:</label>
          <input type="text" className="form-control" id="cityId" name="id" value={formData.id} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="text" className="form-control" id="image" name="image" value={formData.image} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="prices">Prices:</label>
          <input type="text" className="form-control" id="prices" name="prices" value={formData.prices} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration:</label>
          <input type="text" className="form-control" id="duration" name="duration" value={formData.duration} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="person">Person:</label>
          <input type="text" className="form-control" id="person" name="person" value={formData.person} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input type="text" className="form-control" id="rating" name="rating" value={formData.rating} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="reviews">Reviews:</label>
          <input type="text" className="form-control" id="reviews" name="reviews" value={formData.reviews} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="destid">Destination ID:</label>
          <input type="text" className="form-control" id="destid" name="destid" value={formData.destid} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add City</button>
      </form>
    </div>
  );
}

export default AddCity;

import React, { useState } from 'react';

function AddDest({ onAddDestination }) {
  const [formData, setFormData] = useState({
    destid: '',
    destname: '',
    destimg: '',
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
      const response = await fetch('http://localhost:3001/api/adddestinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newDestination = await response.json();
        onAddDestination(newDestination); 
        setFormData({
          destid: '',
          destname: '',
          destimg: '',
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
      <h2 className="mb-4">Add New Destination</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="destname">Destination Name:</label>
          <input type="text" className="form-control" id="destname" name="destname" value={formData.destname} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="destid">Destination ID:</label>
          <input type="text" className="form-control" id="destid" name="destid" value={formData.destid} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="destimg">Destination Image URL:</label>
          <input type="text" className="form-control" id="destimg" name="destimg" value={formData.destimg} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Destination</button>
      </form>
    </div>
  );
}

export default AddDest;

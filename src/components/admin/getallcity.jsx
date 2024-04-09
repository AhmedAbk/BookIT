import React, { useEffect, useState } from 'react';

function GetAllCity() {
  const [cities, setCities] = useState([]);
  const [editingCityId, setEditingCityId] = useState(null);
  const [editedCityName, setEditedCityName] = useState('');
  const [editedCityImg, setEditedCityImg] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/allcitiees');
        if (response.ok) {
          const data = await response.json();
          setCities(data);
        } else {
          console.error('Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching cities:', error.message);
      }
    };

    fetchCities();
  }, []);

  const handleDelete = async (cityId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/allcity/${cityId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCities((prevCities) => prevCities.filter((city) => city.id !== cityId));
      } else {
        console.error('Error deleting city:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleEdit = (cityId, cityName, cityImg) => {
    setEditingCityId(cityId);
    setEditedCityName(cityName);
    setEditedCityImg(cityImg);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/allcity/${editingCityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedCityName,
          image: editedCityImg,
        }),
      });

      if (response.ok) {
        setCities((prevCities) =>
          prevCities.map((city) =>
            city.id === editingCityId ? { ...city, name: editedCityName, image: editedCityImg } : city
          )
        );

        setEditingCityId(null);
        setEditedCityName('');
        setEditedCityImg('');
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
    setIsModalOpen(false);
  };

  
  
  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Cities</h2>
      <ul className="list-group">
        {cities.map((city) => (
          <li key={city.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingCityId === city.id ? (
              <div>
                <input
                  type="text"
                  placeholder="City Name"
                  value={editedCityName}
                  onChange={(e) => setEditedCityName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="City Image URL"
                  value={editedCityImg}
                  onChange={(e) => setEditedCityImg(e.target.value)}
                />
                <button className="btn btn-success ml-2" onClick={handleSaveEdit}>
                  Save
                </button>
                <button className="btn btn-danger ml-2" onClick={() => setEditingCityId(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <strong>{city.name}</strong>
                <br />
                <img src={city.image} alt={city.name} className="img-fluid" style={{ maxWidth: '200px' }} />
              </div>
            )}
            <div>
              <button className="btn btn-danger mr-2" onClick={() => handleDelete(city.id)}>
                Delete
              </button>
              {editingCityId !== city.id && (
                <button className="btn btn-primary" onClick={() => handleEdit(city.id, city.name, city.image)}>
                  Edit
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetAllCity;

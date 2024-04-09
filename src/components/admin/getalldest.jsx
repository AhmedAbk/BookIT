import React, { useEffect, useState } from 'react';

function GetAllDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [editingDestId, setEditingDestId] = useState(null);
  const [editedDestName, setEditedDestName] = useState('');
  const [editedDestImg, setEditedDestImg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/alldestinations');
        if (response.ok) {
          const data = await response.json();
          setDestinations(data);
        } else {
          console.error('Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchDestinations();
  }, []);

  const handleDelete = async (destid) => {
    try {
      const response = await fetch(`http://localhost:3001/api/alldestinations/${destid}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDestinations((prevDestinations) => prevDestinations.filter((dest) => dest.destid !== destid));
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleEdit = (destid, destname, destimg) => {
    setEditingDestId(destid);
    setEditedDestName(destname);
    setEditedDestImg(destimg);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/alldestinations/${editingDestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destname: editedDestName,
          destimg: editedDestImg,
        }),
      });

      if (response.ok) {
        setDestinations((prevDestinations) =>
          prevDestinations.map((dest) =>
            dest.destid === editingDestId ? { ...dest, destname: editedDestName, destimg: editedDestImg } : dest
          )
        );

        setEditingDestId(null);
        setEditedDestName('');
        setEditedDestImg('');
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }

    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDestId(null);
    setEditedDestName('');
    setEditedDestImg('');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Destinations</h2>
      <ul className="list-group">
        {destinations.map((destination) => (
          <li key={destination.destid} className="list-group-item d-flex justify-content-between align-items-center">
            {editingDestId === destination.destid ? (
              <div>
                <input
                  type="text"
                  placeholder="Destination Name"
                  value={editedDestName}
                  onChange={(e) => setEditedDestName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Destination Image URL"
                  value={editedDestImg}
                  onChange={(e) => setEditedDestImg(e.target.value)}
                />
                <button className="btn btn-success ml-2" onClick={handleSaveEdit}>
                  Save
                </button>
                <button className="btn btn-danger ml-2" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <strong>{destination.destname}</strong>
                <br />
                <img src={destination.destimg} alt={destination.destname} className="img-fluid" style={{ maxWidth: '200px' }} />
              </div>
            )}
            <div>
              <button className="btn btn-danger mr-2" onClick={() => handleDelete(destination.destid)}>
                Delete
              </button>
              {editingDestId !== destination.destid && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(destination.destid, destination.destname, destination.destimg)}
                >
                  Edit
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <input
              type="text"
              placeholder="Destination Name"
              value={editedDestName}
              onChange={(e) => setEditedDestName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Destination Image URL"
              value={editedDestImg}
              onChange={(e) => setEditedDestImg(e.target.value)}
            />
            <button className="btn btn-success ml-2" onClick={handleSaveEdit}>
              Save
            </button>
            <button className="btn btn-danger ml-2" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetAllDestinations;

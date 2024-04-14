import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate hook directly from react-router-dom
import { Link } from 'react-router-dom';

const Packres = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/bookes/${id}`);
        const data = await response.json();
        console.log(id);
        console.log(data);
        if (response.ok) {
          setSelectedBook(data);
        } else {
          setError(`Error: ${data.message || 'Failed to fetch'}`);
        }
      } catch (error) {
        setError(`Error fetching Book: ${error.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();

  }, [id]);

  useEffect(() => {
    const isLoggedInStorage = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(isLoggedInStorage === 'true');
  }, []);

  const handleReadNow = () => {
    if (isLoggedIn) {
      navigate('/Res'); // Redirect to /Res if logged in
    } else {
      navigate('/Login'); // Redirect to /Reg if not logged in
    }
  };

  const renderBookDetails = () => {
    if (selectedBook) {
      return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 mb-4">
              <img src={selectedBook.bimage} className="img-fluid" alt={selectedBook.bname} />
            </div>
            <div className="col-md-6">
              <h2 className="mb-4">{selectedBook.bname}</h2>
              <p>{selectedBook.bdesc}</p>
              <h4 className="mt-4">book Details:</h4>
              <ul>
                <li>author: {selectedBook.author}</li>
                <li>Prices starting from {selectedBook.prices} $</li>
              </ul>
              <button className="btn btn-primary mt-3" onClick={handleReadNow}>
                read now
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-3 pb-3">
            <h6 className="text-primary text-uppercase" style={{ letterSpacing: '5px' }}>Packages</h6>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {renderBookDetails() || (
                <p>Error: {error || 'Book not found'}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Packres;

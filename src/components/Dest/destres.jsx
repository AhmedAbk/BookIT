import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Destres = ({ categoryId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/books/${categoryId}`);
        const data = await response.json();

        console.log(categoryId);
        console.log(data);

        if (response.ok) {
          setBooks(data.data);
        } else {
          setError(`Error: ${data.message || 'Failed to fetch'}`);
        }
      } catch (error) {
        setError(`Error fetching Books: ${error.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [categoryId]);

  const openModal = (book) => {
    setShowModal(true);
    setSelectedBook(book);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* Packages Start */}
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-3 pb-3">
            <h6 className="text-primary text-uppercase" style={{ letterSpacing: '5px' }}>Packages</h6>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="row">
              {books.map((book, index) => (
                <div className="col-lg-4 col-md-6 mb-4" key={index} onClick={() => openModal(book)}>
                  <div className="package-item bg-white mb-2"> 
                    <img className="img-fluid" src={book.bimage} 
                      style={{ width: '100%', height: '250px', objectFit: 'cover' }}/>
                    <div className="p-4">
                      <div className="d-flex justify-content-between mb-3">
                        <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2" />{book.bname}</small>
                        <small className="m-0"><i className="fa fa-calendar-alt text-primary mr-2" />{book.pyear}</small>
                        <small className="m-0"><i className="fa fa-user text-primary mr-2" />{book.author}</small>
                      </div>
                      <a className="h5 text-decoration-none"> Visit {book.bname}</a>
                      <div className="border-top mt-4 pt-4">
                        <div className="d-flex justify-content-between">
                          <h6 className="m-0"><i className="fa fa-star text-primary mr-2" />{book.brating} <small>({book.breviews})</small></h6>
                          <h5 className="m-0">$ {book.prices}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Packages End */}

      {/* Modal Start */}
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedBook.bname} Information</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Display Book Information */}
                <img className="img-fluid" src={selectedBook.bimage} alt={selectedBook.bname} />
                <div className="p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2" />{selectedBook.bname}</small>
                    <small className="m-0"><i className="fa fa-calendar-alt text-primary mr-2" />{selectedBook.pyear}</small>
                    <small className="m-0"><i className="fa fa-user text-primary mr-2" />{selectedBook.author}</small>
                  </div>
                  <p>{selectedBook.pdesc}</p>
                  <div className="border-top mt-4 pt-4">
                    <div className="d-flex justify-content-between">
                      <h6 className="m-0"><i className="fa fa-star text-primary mr-2" />{selectedBook.brating} <small>({selectedBook.breviews})</small></h6>
                      <h5 className="m-0">$ {selectedBook.prices}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal End */}
    </div>
  );
};

export default Destres;

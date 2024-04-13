import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Catres = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Book, setBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedbook, setSelectedbook] = useState(' ');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/books/${id}`);
        const data = await response.json();

        console.log(id);
        console.log(data);

        if (response.ok) {
          setBook(data);
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

  const openModal = (book) => {
    setShowModal(true);
    setSelectedbook(book);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getbookInformation = (book) => {
    const { data } = Book || {};
  
    if (data && Array.isArray(data)) { 
      return data.map((bookData, index) => {
        if (bookData.bname === book) {
          return (
            <div key={index}> 
              <img className="img-fluid" src={bookData.bimage} alt={`${bookData.bname}`} />
              <div className="p-4">
                <div className="d-flex justify-content-between mb-3">
                  <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2" />{bookData.bname}</small>
                  <small className="m-0"><i className="fa fa-user text-primary mr-2" />{bookData.author}</small>
                </div>
                <a className="h5 text-decoration-none">{bookData.pdesc}</a>
                <div className="border-top mt-4 pt-4">
                  <div className="d-flex justify-content-between">
                    <h6 className="m-0"><i className="fa fa-star text-primary mr-2" />{bookData.brating} <small>({bookData.breviews})</small></h6>
                    <h5 className="m-0"> $ {bookData.prices}</h5>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      });
    } else if (data) {
      // one  
      const { bimage, prices, pdesc, duration, author, rating, breviews, name } = data;
  
      if (name === book) {
        return (
          <>
            <img className="img-fluid" src={bimage} alt={`${name}`} />
            <div className="p-4">
              <div className="d-flex justify-content-between mb-3">
                <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2" />{name}</small>
                <small className="m-0"><i className="fa fa-calendar-alt text-primary mr-2" />{duration}</small>
                <small className="m-0"><i className="fa fa-user text-primary mr-2" />{author}</small>
              </div>
              <a className="h5 text-decoration-none">{pdesc}</a>
              <div className="border-top mt-4 pt-4">
                <div className="d-flex justify-content-between">
                  <h6 className="m-0"><i className="fa fa-star text-primary mr-2" />{rating} <small>{breviews}</small></h6>
                  <h5 className="m-0">{prices}</h5>
                </div>
              </div>
            </div>
  
            <Link to="/Login">
              <button className="btn btn-primary">Book Now</button>
            </Link>
          </>
        );
      } else {
        return `Information about ${book}.`;
      }
    } else {
      return `Information about ${book}.`;
    }
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
              {Book?.data?.map((bookData, index) => (
                <div className="col-lg-4 col-md-6 mb-4" key={index} onClick={() => openModal(bookData.bname)}>
                  <div className="package-item bg-white mb-2"> 
                    <img className="img-fluid" src={bookData.bimage} 
                      style={{ width: '100%', height: '250px', objectFit: 'cover' }}/>
                    <div className="p-4">
                      <div className="d-flex justify-content-between mb-3">
                        <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2" />{bookData.bname}</small>
                        <small className="m-0"><i className="fa fa-calendar-alt text-primary mr-2" />{bookData.duration}</small>
                        <small className="m-0"><i className="fa fa-user text-primary mr-2" />{bookData.author}</small>
                      </div>
                      <a className="h5 text-decoration-none"> Visit {bookData.bname}</a>
                      <div className="border-top mt-4 pt-4">
                        <div className="d-flex justify-content-between">
                          <h6 className="m-0"><i className="fa fa-star text-primary mr-2" />{bookData.brating} <small>({bookData.breviews})</small></h6>
                          <h5 className="m-0">$ {bookData.prices}</h5>
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
                <h5 className="modal-title">{selectedbook} Information</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {getbookInformation(selectedbook)}
                <Link to='/Res'>
              <button className="btn btn-primary mt-3"  >
                book now
              </button>
              </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal End */}
    </div>
  );
};

export default Catres;

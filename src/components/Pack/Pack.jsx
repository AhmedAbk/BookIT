import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Packres from './Packres';

function Pack() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/books');
        const data = await res.json();
        setBooks(data); 
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <div>
      {/* Packages Start */}
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-3 pb-3">
            <h6 className="text-primary text-uppercase" style={{ letterSpacing: '5px' }}>
              Books
            </h6>
            <h1>Read all books</h1>
          </div>
          <div className="row">
            {books.map((book) => (
              <div className="col-lg-4 col-md-6 mb-4" key={book.bid}>
                <div className="package-item bg-white mb-2">
                  <Link to={`/Pack/${book.bid}`}>
                    <img
                      className="img-fluid"
                      src={book.bimage}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                      alt={book.bname}
                    />
                    <div className="p-4">
                      <div className="d-flex justify-content-between mb-3"> 
                        <small className="m-0"><i className="fa fa-user text-primary mr-2" />{book.author}</small>
                      </div>
                      <div className="h5 text-decoration-none">Read {book.bname}</div>
                      <div className="border-top mt-4 pt-4">
                        <div className="d-flex justify-content-between">
                          <h6 className="m-0"><i className="fa fa-star text-primary mr-2" />{book.brating} <small>({book.breviews})</small></h6>
                          <h5 className="m-0">{book.bprice}</h5>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedBook && <Packres id={selectedBook.bid} />}
    </div>
  );
}

export default Pack;

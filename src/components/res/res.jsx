import React, { useState, useEffect } from 'react';

function Res() {
  const [formData, setFormData] = useState({
    full_name: '',
    nb_books: 0,
    bprice: 0,
    bid: 0,
    loc: '',
    pay: 'Visa' // Default payment method
  });

  const [Books, setBooks] = useState([]);

  useEffect(() => { 
    fetchBooks();
  }, []); 

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch Books');
      }
      const BooksData = await response.json();
      setBooks(BooksData);
    } catch (error) {
      console.error('Error fetching Books:', error);
    }
  };

  const handlebookChange = (e) => {
    const selectedbookId = parseInt(e.target.value);
    const selectedbook = Books.find(book => book.bid === selectedbookId);
    if (selectedbook) {
      setFormData({ ...formData, bid: selectedbookId, price: selectedbook.bprice }); 
    }
  };
  

  const handleOrder = async (event) => {
    event.preventDefault();
    try {
      const totalPrice = formData.bprice * formData.nb_books; 
      const dataToSend = { ...formData, price: totalPrice };
      const response = await fetch('http://localhost:3001/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit an order');
      } 
      setFormData({
        full_name: '',
        nb_books: 0,
        bprice: 0, 
        bid: 0,
        loc: '',
        pay: 'Visa' 
      });
  
      alert('Order submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit Order. Please try again.');
    }
  };
  

  const handlePersonChange = (e) => {
    const nb_books = parseInt(e.target.value);
    const totalPrice = formData.bprice * nb_books;
    setFormData({ ...formData, nb_books, price: totalPrice });
  };

  const handlePaymentMethodChange = (e) => {
    setFormData({ ...formData, pay: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2>Order Form</h2>
      <form onSubmit={handleOrder}>
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
          <label htmlFor="id" className="form-label">Choose a book</label>
          <select
            className="form-select"
            id="bid"
            value={formData.bid}
            onChange={handlebookChange}
          >
            <option value={0}>Select a book</option>
            {Books.map(book => (
              <option key={book.bid} value={book.bid}>{book.bname}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="nb_books" className="form-label">Number of Books</label>
          <input
            type="number"
            className="form-control"
            id="nb_books"
            value={formData.nb_books}
            onChange={handlePersonChange}
            placeholder="Enter Number of books"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={formData.bprice}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            placeholder="Enter Price"
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="loc" className="form-label">Shipping Location</label>
          <input
            type="text"
            className="form-control"
            id="loc"
            value={formData.loc}
            onChange={(e) => setFormData({ ...formData, loc: e.target.value })}
            placeholder="Enter Shipping Location"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pay" className="form-label">Choose a payment method</label>
          <select
            className="form-select"
            id="pay"
            value={formData.pay}
            onChange={handlePaymentMethodChange}
          >
            <option value="Visa">Visa</option>
            <option value="Paypal">Paypal</option>
            <option value="On arrival">On arrival</option>
          </select>
        </div>
     

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Res;

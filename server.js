//server setup
import express from "express";
import pkg from 'pg';
const { Pool } = pkg;
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bookstore',
  password: '8624',
  port: 5432,
});

pool.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//server setup

//middlewear
app.use(cors());
app.use(express.json());  
//middlewear


// Get all categories
app.get('/api/allcategories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json({ data: result.rows });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get category by ID
app.get('/api/categories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM categories WHERE catid = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new category
app.post('/api/categories', async (req, res) => {
  const { catname, catimage } = req.body;
  try {
    const result = await pool.query('INSERT INTO categories (catname, catimage) VALUES ($1, $2) RETURNING *', [catname, catimage]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all books
app.get('/api/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get book by ID 
app.get("/api/bookes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM books WHERE bid = $1', [id]);
     
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    } 
    res.json(result.rows[0]);  
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/api/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM books b,categories c WHERE c.catid=b.catid and b.catid = $1', [id]);
    
    res.json({ data: result.rows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Add a new book
app.post('/api/books', async (req, res) => {
  const { bname, bimage, bprice, pdesc, brating, breviews, catid, author, pyear } = req.body;
  try {
    const result = await pool.query('INSERT INTO books (bname, bimage, bprice, pdesc, brating, breviews, catid, author, pyear) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [bname, bimage, bprice, pdesc, brating, breviews, catid, author, pyear]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "user"');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM "user" WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new user
app.post('/api/register', async (req, res) => {
  const { name, phone, cin, email, pass } = req.body;

  try { 
    const emailCheck = await pool.query('SELECT * FROM buser WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }
 
    const cinCheck = await pool.query('SELECT * FROM buser WHERE cin = $1', [cin]);
    if (cinCheck.rows.length > 0) {
      return res.status(400).json({ error: 'CIN already exists' });
    } 
    const newUser = await pool.query(
      'INSERT INTO buser (name, phone, cin, email, pass) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, phone, cin, email, pass]
    );

    res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

 //login
app.get('/api/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const result = await pool.query('SELECT email, pass FROM buser WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      const userData = result.rows[0];
      res.json({ data: userData });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//commande
app.post('/api/order', async (req, res) => {
  try { 
    const { full_name, nb_books, price, loc, pay, bid } = req.body;
    // Insert order into the database
    const query = `
      INSERT INTO orders (full_name, nb_books, price, loc, pay, bid)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [full_name, nb_books, price, loc, pay, bid]; // Include price

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting order:', error);
    res.status(500).json({ error: 'Failed to insert order' });
  }
});

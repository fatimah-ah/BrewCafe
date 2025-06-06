const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'brewcafe'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});

// REGISTER API
app.post('/signup', (req, res) => {
  const { fullName, email, phone, password } = req.body;

  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    const query = 'INSERT INTO users (fullName, email, phone, password) VALUES (?, ?, ?, ?)';
    db.query(query, [fullName, email, phone, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Email already registered' });
        }
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// LOGIN API
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length === 0)
      return res.status(404).json({ message: 'User not found' });

    const user = results[0];

    // Compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Server error' });

      if (!isMatch)
        return res.status(401).json({ message: 'Invalid password' });

      // Send user data (except password)
      res.json({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      });
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// GET USER BY EMAIL
app.get('/api/user', (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const query = 'SELECT fullName FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    res.json(results[0]);
  });
});

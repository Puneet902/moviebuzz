const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const cors = require('cors');
app.use(cors());  // Allow cross-origin requests

const app = express();
const port = 3003;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`\n📥 ${req.method} ${req.url}`);
  console.log("Body:", req.body);
  next();
});

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mywebsite'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL');
});

// Save user (Google or Phone login)
app.post('/save-user', (req, res) => {
  const { email, phone } = req.body;

  const sql = `
    INSERT INTO users (email, phone)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE email = VALUES(email), phone = VALUES(phone)
  `;

  db.query(sql, [email || null, phone || null], (err) => {
    if (err) {
      console.error("❌ Error saving user:", err.message);
      return res.status(500).json({ success: false, message: "DB Error: " + err.message });
    }

    console.log("✅ User saved:", email || phone);
    res.json({ success: true, message: 'User saved successfully' });
  });
});

// Save ticket booking
app.post('/save-ticket', (req, res) => {
  const { user_id, movie_name, seat_number, total_amount, show_time, show_date } = req.body;

  if (!user_id || !movie_name || !seat_number || !total_amount || !show_time || !show_date) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  const sql = 'INSERT INTO bookings (user_id, movie_name, seat_number, total_amount, show_time, show_date) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [user_id, movie_name, seat_number, total_amount, show_time, show_date], (err, result) => {
      if (err) {
          console.error('DB error:', err);
          return res.status(500).json({ success: false, message: 'DB Error' });
      }
      res.status(200).json({ success: true, message: 'Ticket booked!' });
  });
});
app.get('/get-latest-booking', (req, res) => {
  const sql = 'SELECT * FROM bookings ORDER BY booking_id DESC LIMIT 1';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('❌ DB error:', err);
      return res.status(500).json({ success: false, message: 'DB Error' });
    }

    console.log('Query result:', result);  // Log the query result

    if (result.length > 0) {
      console.log('Latest booking details:', result[0]);
      res.status(200).json({ success: true, booking: result[0] });
    } else {
      console.log('No bookings found');
      res.status(404).json({ success: false, message: 'No booking found' });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});





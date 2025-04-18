const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const cors = require('cors');
require('dotenv').config();
const upload = multer({ dest: 'uploads/' });
const nodemailer = require('nodemailer');
const { decodeBase64 } = require('./utils');
app.use(cors());  // Allow cross-origin requests
app.use(bodyParser.json());
const app = express();
const port = 3008;

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
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'EMAIL_USER',
    pass: 'EMAIL_PASS',
  },
});

// Function to send the PDF via email
app.post('/send-ticket-pdf', (req, res) => {
  const { pdfBase64 } = req.body;

  // Decode the PDF from Base64
  const pdfBuffer = decodeBase64(pdfBase64);
  const pdfPath = path.join(__dirname, 'ticket.pdf');
  
  fs.writeFileSync(pdfPath, pdfBuffer); // Save PDF file temporarily

  // Get user's email (assume you fetch it from the database)
  const userEmail = getUserEmailFromDB(); // Replace with actual database query

  // Set up the email options
  const mailOptions = {
    from: 'EMAIL_USER',
    to: userEmail,
    subject: 'Your Movie Ticket',
    text: 'Please find your movie ticket attached.',
    attachments: [
      {
        filename: 'ticket.pdf',
        path: pdfPath,
      },
    ],
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Failed to send email' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ success: true, message: 'Ticket sent to email' });
    
    // Remove the temporary PDF file after sending
    fs.unlinkSync(pdfPath);
  });
});
// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});





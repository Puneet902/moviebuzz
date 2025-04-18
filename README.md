# 🎬 Moviebuzz - Movie Ticket Booking System

**Moviebuzz** is an all-in-one movie ticket booking system that allows users to log in via Google/Phone (using Firebase), book tickets, and receive them as PDFs via email. The project is built using Node.js, MySQL, and Firebase Auth, with PDF generation and email sending integrated.

---

## ✨ Features

- 🔐 Google and Phone Authentication using Firebase
- 🎟️ Seat selection and ticket booking
- 📧 Email delivery of PDF ticket (Gmail + Nodemailer)
- 🟢 MySQL database integration
- 📦 Backend logging for request tracing
- 🖨️ PDF generation with ticket details

---

## 📦 Dependencies

Installed via `npm install`:

- express
- mysql
- body-parser
- path
- nodemailer
- fs
- pdfkit
- cors
- dotenv
- multer

---

## 📁 Project Structure

```
moviebuzz/
├── server.js                # Backend logic
├── public/                 # Static frontend files (index.html, CSS, JS)
├── uploads/                # Temporary files if needed
├── utils.js                # decodeBase64 helper
├── .env                    # API keys & DB config
└── README.md
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Puneet902/moviebuzz.git
cd moviebuzz
```

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Firebase Authentication

- Go to [Firebase Console](https://console.firebase.google.com)
- Create a new project
- Enable **Google** and **Phone Number** Authentication
- Add your Firebase config to the frontend script

---

### 4. Set Up MySQL Database

Create a database named `mywebsite` and run the following:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20)
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  movie_name VARCHAR(255),
  seat_number VARCHAR(50),
  total_amount INT,
  show_time VARCHAR(100),
  show_date DATE
);
```

Update DB credentials in `server.js` if needed.

---

### 5. Gmail SMTP Setup for Email

- Use a Gmail account and enable **App Passwords** or allow **less secure apps**
- Add the following to your `.env` file:

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

- Update `server.js` to use:

```js
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

---

### 6. Start the Server

```bash
node server.js
```

Server runs at: [http://localhost:3008](http://localhost:3008)

---

## 📬 Email Ticket System

PDF tickets are sent using `nodemailer` and `fs`. The ticket is first created in base64 format, converted, temporarily saved, and emailed. After sending, it's auto-deleted from disk.

Ensure your Send endpoint (`/send-ticket-pdf`) is triggered **after booking**.

---

## ⚖️ License (MIT)

```
MIT License

Copyright (c) 2025 Boina Puneet Vaishnav

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💼 Author

- **Boina Puneet Vaishnav**
- 🎓 B.Tech Computer Science, SRM University AP
- 📧 [puneetvaishnav902@gmail.com](mailto:puneetvaishnav902@gmail.com)


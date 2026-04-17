const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import Route Gacha
const gacha = require('./routes/gacha');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Daftarkan Jalur API
// Nantinya kamu bisa akses lewat http://localhost:5000/api/gacha
app.use('/api/gacha', gacha);

// Route dasar untuk cek server
app.get('/', (req, res) => {
  res.send('Server Backend Gacha sedang berjalan...');
});

module.exports = app;

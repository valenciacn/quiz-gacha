require('dotenv').config();
const mongoose = require('mongoose');
const Prize = require('./src/models/prize'); // Memanggil file hadiah yang tadi dibuat

// Daftar 5 hadiah sesuai dengan soal kuis
const listHadiah = [
  { name: 'Emas 10 gram', initial_quota: 1, remaining_quota: 1 },
  { name: 'Smartphone X', initial_quota: 5, remaining_quota: 5 },
  { name: 'Smartwatch Y', initial_quota: 10, remaining_quota: 10 },
  { name: 'Voucher Rp100.000', initial_quota: 100, remaining_quota: 100 },
  { name: 'Pulsa Rp50.000', initial_quota: 500, remaining_quota: 500 },
];

// Menyambungkan ke database dan memasukkan data
mongoose
  .connect(process.env.DB_CONNECTION, { dbName: process.env.DB_NAME })
  .then(async () => {
    console.log('Berhasil tersambung ke Database!');

    // Menghapus data lama (jika ada) agar tidak dobel
    await Prize.deleteMany({});

    // Memasukkan 5 data hadiah baru
    await Prize.insertMany(listHadiah);
    console.log('Mantap! 5 Data Hadiah berhasil dimasukkan ke Database!');

    // Keluar dari program
    process.exit();
  })
  .catch((err) => {
    console.log('Waduh, ada error:', err);
    process.exit(1);
  });

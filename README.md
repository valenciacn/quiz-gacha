# Kuis Backend Programming 1 - Sistem Gacha Undian

**Nama:** Valencia  
**Database:** MongoDB Atlas  
**Teknologi:** Node.js, Express, Mongoose

Project ini adalah tugas Kuis untuk mata kuliah Back-End Programming yang mengimplementasikan sistem undian gacha dengan batasan kuota dan limit harian.

## Fitur Utama

**Limit Harian:** Setiap user hanya bisa melakukan gacha maksimal 5 kali dalam 24 jam.
**Kontrol Kuota:** Sistem memvalidasi sisa kuota hadiah sebelum menentukan pemenang agar tidak melebihi batas.
**Logging Database:** Setiap tarikan gacha (menang atau kalah) tercatat secara permanen di MongoDB Atlas.
**Sensor Nama:** Daftar pemenang ditampilkan dengan nama yang disamarkan secara acak untuk privasi.

## Endpoint API

### 1. Main Gacha (Utama)

Digunakan untuk melakukan tarikan undian.

- **URL:** `/api/gacha`
- **Method:** `POST`
- **Body (JSON):**
  ```json
  {
    "userId": "Valencia123"
  }
  ```

### 2. Histori Gacha User (Bonus)

Melihat riwayat semua tarikan gacha yang pernah dilakukan oleh satu user tertentu.

- **URL:** `/api/gacha/history/:userId`
- **Method:** `GET`
- **Contoh:** `/api/gacha/history/Valencia123`

### 3. Daftar Hadiah & Sisa Kuota (Bonus)

Mengecek daftar hadiah yang tersedia beserta sisa kuotanya saat ini.

- **URL:** `/api/gacha/prizes`
- **Method:** `GET`

### 4. Daftar Pemenang Terkini (Bonus)

Menampilkan daftar user yang berhasil memenangkan hadiah dengan nama yang sudah disamarkan.

- **URL:** `/api/gacha/winners`
- **Method:** `GET`

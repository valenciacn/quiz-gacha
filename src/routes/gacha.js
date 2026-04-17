const express = require('express');

const router = express.Router();
const gachaController = require('../controllers/gacha.controller');

// Endpoint Utama: Bermain Gacha
router.post('/', gachaController.play);

// BONUS 1: Endpoint Histori Gacha User
router.get('/history/:userId', gachaController.getHistory);

// BONUS 2: Endpoint Daftar Hadiah & Sisa Kuota
router.get('/prizes', gachaController.getPrizes);

module.exports = router;

// BONUS 3: Endpoint Daftar Pemenang (Disamarkan)
router.get('/winners', gachaController.getWinners);

module.exports = router;

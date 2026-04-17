const gachaService = require('../services/gacha.service');

class GachaController {
  async play(req, res) {
    try {
      const { userId } = req.body;
      if (!userId)
        return res.status(400).json({ message: 'User ID wajib diisi' });
      const result = await gachaService.playGacha(userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Fungsi Baru: Ambil Histori
  async getHistory(req, res) {
    try {
      const { userId } = req.params;
      const history = await gachaService.getUserHistory(userId);
      res.status(200).json(history);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Fungsi Baru: Ambil Daftar Hadiah
  async getPrizes(req, res) {
    try {
      const prizes = await gachaService.getAllPrizes();
      res.status(200).json(prizes);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // FUNGSI BONUS 3: Ambil Daftar Pemenang Tersensor
  async getWinners(req, res) {
    try {
      const winners = await gachaService.getWinners();
      res.status(200).json(winners);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new GachaController();

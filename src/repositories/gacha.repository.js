const GachaHistory = require('../models/gachaHistory');
const Prize = require('../models/prize');

class GachaRepository {
  // --- FUNGSI UTAMA: Cek jatah harian user (Penting untuk Limit 5x) ---
  async countUserGachaToday(userId) {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    return await GachaHistory.countDocuments({
      user_id: userId,
      date: { $gte: startOfToday, $lte: endOfToday },
    });
  }

  // --- FUNGSI UTAMA: Ambil hadiah yang masih ada kuotanya ---
  async getAvailablePrizes() {
    return await Prize.find({ remaining_quota: { $gt: 0 } });
  }

  // --- FUNGSI UTAMA: Catat hasil gacha ke database ---
  async createHistory(data) {
    return await GachaHistory.create(data);
  }

  // --- FUNGSI UTAMA: Potong kuota hadiah jika ada yang menang ---
  async decreasePrizeQuota(prizeId) {
    return await Prize.findByIdAndUpdate(prizeId, {
      $inc: { remaining_quota: -1 },
    });
  }

  // --- FUNGSI BONUS: Ambil histori gacha milik satu user ---
  async findHistoryByUserId(userId) {
    // Populate digunakan agar ID hadiah berubah jadi nama hadiah yang bisa dibaca
    return await GachaHistory.find({ user_id: userId }).populate('prize_id');
  }

  // --- FUNGSI BONUS: Ambil semua daftar hadiah dan sisa kuotanya ---
  async findAllPrizes() {
    return await Prize.find({});
  }

  // --- FUNGSI BONUS 3: Ambil semua data histori yang menang ---
  async findWinners() {
    return await GachaHistory.find({ is_win: true }).populate('prize_id');
  }
}

module.exports = new GachaRepository();

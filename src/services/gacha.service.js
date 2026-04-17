const gachaRepository = require('../repositories/gacha.repository');

class GachaService {
  // --- FUNGSI UTAMA ---
  async playGacha(userId) {
    // 1. Cek jatah harian (Maksimal 5 kali)
    const playCount = await gachaRepository.countUserGachaToday(userId);
    if (playCount >= 5) {
      throw new Error('Jatah gacha harian kamu sudah habis! Coba lagi besok.');
    }

    // 2. Logika Menang (Peluang 30%)
    const isWinning = Math.random() < 0.3;
    let prize = null;

    if (isWinning) {
      const availablePrizes = await gachaRepository.getAvailablePrizes();
      if (availablePrizes.length > 0) {
        prize =
          availablePrizes[Math.floor(Math.random() * availablePrizes.length)];
        // 3. Pastikan jumlah pemenang tidak melebihi kuota
        await gachaRepository.decreasePrizeQuota(prize._id);
      }
    }

    // 4. Catat riwayat ke MongoDB
    await gachaRepository.createHistory({
      user_id: userId,
      is_win: !!prize,
      prize_id: prize ? prize._id : null,
    });

    return {
      message: prize
        ? `Selamat! Kamu menang ${prize.name}`
        : 'Maaf, belum beruntung.',
      prize: prize ? prize.name : null,
    };
  }

  // --- FUNGSI BONUS 1: Ambil Histori User ---
  async getUserHistory(userId) {
    return await gachaRepository.findHistoryByUserId(userId);
  }

  // --- FUNGSI BONUS 2: Ambil Daftar Semua Hadiah ---
  async getAllPrizes() {
    return await gachaRepository.findAllPrizes();
  }

  // --- FUNGSI BONUS 3: Kelompokkan Pemenang & Samarkan Nama (REVISI SENSOR) ---
  async getWinners() {
    const winners = await gachaRepository.findWinners();

    // Logika menyamarkan nama (Huruf awal & akhir tampil, tengah bintang)
    const maskName = (name) => {
      if (!name) return '***';
      if (name.length <= 2) return `${name[0]}*`;

      const firstChar = name[0];
      const lastChar = name[name.length - 1];
      const middleStars = '*'.repeat(name.length - 2); // Ubah tengah jadi bintang

      return firstChar + middleStars + lastChar;
    };

    // Kelompokkan data pemenang berdasarkan hadiah
    const groupedWinners = {};

    winners.forEach((history) => {
      if (history.prize_id) {
        const prizeName = history.prize_id.name;
        if (!groupedWinners[prizeName]) {
          groupedWinners[prizeName] = [];
        }
        groupedWinners[prizeName].push(maskName(history.user_id));
      }
    });

    // Rapikan bentuk datanya agar enak dibaca menjadi array of objects
    const result = Object.keys(groupedWinners).map((prize) => ({
      hadiah: prize,
      pemenang: groupedWinners[prize],
    }));

    return result;
  }
}

module.exports = new GachaService();

const mongoose = require('mongoose');

const gachaHistorySchema = new mongoose.Schema({
  // Kita ubah type-nya jadi String supaya kamu bisa input nama biasa
  user_id: {
    type: String,
    required: true,
  },
  is_win: {
    type: Boolean,
    required: true,
  },
  // Untuk prize_id tetap ObjectId karena dia menyambung ke data Hadiah
  prize_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prize',
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('GachaHistory', gachaHistorySchema);

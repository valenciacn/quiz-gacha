const mongoose = require('mongoose');

const prizeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    initial_quota: {
      type: Number,
      required: true,
    },
    remaining_quota: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Otomatis mencatat kapan data dibuat/diupdate
  }
);

module.exports = mongoose.model('Prize', prizeSchema);

// models/Attempt.js
const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  score: Number,
  attemptedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Attempt', attemptSchema);
  
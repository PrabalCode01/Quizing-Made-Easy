// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
});

module.exports = mongoose.model('User', userSchema);

// models/Report.js
const mongoose = require('mongoose');

// Report schema
const reportSchema = new mongoose.Schema({
  reward: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reward', // Reference to Reward model
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true,
  },
  transaction_date: {
    type: Date,
    required: true,
  },
  details: {
    type: String,
  },
  amount: {
    type: mongoose.Decimal128,
  },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;

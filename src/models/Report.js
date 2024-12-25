// models/Report.js
import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  reward: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  transaction_date: { type: Date, required: true },
  details: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Report = mongoose.model('Report', reportSchema);

export default Report;  // Default export

import mongoose from "mongoose";

// Reward schema
const rewardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  amount: {
    type: mongoose.Decimal128, // Use Decimal128 for precision
    required: true,
  },
  file_path: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'], // Status values are consistent
    default: 'Pending',
  },
  reason:{
    type:String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true, // Assuming every reward should be linked to a user
  },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create the Reward model
const Reward = mongoose.model('Reward', rewardSchema);

export default Reward;

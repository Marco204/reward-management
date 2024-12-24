const express = require('express');
const router = express.Router();
const Reward = require('../models/Reward');
const { verifyToken, authorizeRole } = require('../middleware/auth');
const Log = require('../models/Log');

// Add a new reward (POST route)
router.post('/', verifyToken, async (req, res) => {
  const { reason, amount } = req.body;
  try {
    // Create the reward
    const reward = new Reward({ reason, amount, user: req.user.id });
    await reward.save();

    // Log the creation action
    await Log.create({
      user: req.user.id,
      action: `Created reward with amount ${amount}`,
    });

    res.json({ message: 'Reward created successfully', reward });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get rewards for a specific user (GET route)
router.get('/', verifyToken, async (req, res) => {
  try {
    const rewards = await Reward.find({ user: req.user.id });
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all rewards (GET route with role authorization)
router.get(
  '/all',
  verifyToken,
  authorizeRole(['admin', 'finance']),
  async (req, res) => {
    try {
      const rewards = await Reward.find().populate('user', 'name email');
      res.json(rewards);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;

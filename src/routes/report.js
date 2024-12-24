const express = require('express');
const router = express.Router();
const Reward = require('../models/Reward');
const { verifyToken, authorizeRole } = require('../middleware/auth');
const Report = require('../models/Report');

// جلب تقرير شهري (Monthly report)
router.get(
  '/monthly',
  verifyToken,
  authorizeRole(['admin', 'finance']),
  async (req, res) => {
    const { month, year } = req.query; // استلام الشهر والسنة
    try {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      // Aggregate the rewards for the given month and year
      const rewards = await Reward.aggregate([
        { $match: { createdAt: { $gte: startDate, $lt: endDate } } },
        {
          $group: {
            _id: '$user',
            totalAmount: { $sum: '$amount' },
            rewards: { $push: '$$ROOT' },
          },
        },
        {
          $lookup: {
            from: 'users',  // Assuming 'users' is the collection for users
            localField: '_id',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$user' },
      ]);

      res.json(rewards);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Create a new report for a reward
router.post('/', verifyToken, async (req, res) => {
  const { reward_id, transaction_date, details, amount } = req.body;
  try {
    const report = new Report({
      reward: reward_id,
      user: req.user.id,
      transaction_date,
      details,
      amount,
    });
    await report.save();
    res.json({ message: 'Report created successfully', report });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all reports for a specific user
router.get('/', verifyToken, async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user.id });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

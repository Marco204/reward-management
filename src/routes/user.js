// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// Example: Create a new user (for registration)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.json({ message: 'User registered successfully', newUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Example: Get user details (using JWT token to identify user)
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
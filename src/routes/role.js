// routes/role.js
const express = require('express');
const router = express.Router();
const Role = require('../models/Role');

// Example: Create a new role
router.post('/', async (req, res) => {
  const { role_name, permissions } = req.body;
  try {
    const role = new Role({ role_name, permissions });
    await role.save();
    res.json({ message: 'Role created successfully', role });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Example: Get all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

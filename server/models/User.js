const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Save user
    const user = new User({ name, email, password }); // NOTE: Hash password in production!
    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

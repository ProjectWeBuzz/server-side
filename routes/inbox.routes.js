
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Create a new message
router.post('/send', async (req, res) => {
  try {
    const { sender, recipient, subject, content } = req.body;
    const message = new Message({ sender, recipient, subject, content });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get messages for a user
router.get('/inbox/:user', async (req, res) => {
  try {
    const user = req.user;
    const messages = await Message.find({ user });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

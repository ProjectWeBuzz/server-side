
const express = require('express');
const router = express.Router();
const Message = require('../models/Message.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const User = require('../models/User.model');

// Create a new message
router.post('/:username', isAuthenticated, async (req, res) => {
 
  try {
    const username = req.params.username;
    const { sender, recipient, subject, content } = req.body;
    const message = new Message({ username:username, sender:sender, recipient:recipient, subject:subject, content:content });
    await message.save();
    //Update the sender of the message with the new message
    const theSender = await User.findOneAndUpdate({ username:sender }, { $push: { messages: message._id } });
    console.log("yyyy", theSender)
    //Update the recipient of the message with a new message
    await User.findOneAndUpdate({ username:recipient }, { $push: { messages: message._id } });

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Get messages for a user
router.get('/:username', isAuthenticated, async (req, res) => {

  try {
    const username = req.params.username;
    const user = await User.findOne({ username }).populate("messages");
    console.log(user)
  
    // Find messages where the sender or recipient matches the provided username
    // const messages = await Message.find({
    //   $or: [{ sender: username }, { recipient: username }],
    // });
    // res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const Message = require('../models/Message.model');
// const User = require('../models/User.model');
// const { isAuthenticated } = require('../middleware/jwt.middleware');

// // Create a new message
// router.post('/api/messages/send', isAuthenticated, async (req, res) => {
//   try {
//     const { sender, recipient, subject, content } = req.body;
//     const message = new Message({ sender, recipient, subject, content });
//     await message.save();

//     // Update the user's messages array with the new message
//     const senderUser = await User.findOne({ username: sender });
//     const recipientUser = await User.findOne({ username: recipient });

//     if (senderUser && recipientUser) {
//       senderUser.messages.push(message);
//       recipientUser.messages.push(message);

//       await senderUser.save();
//       await recipientUser.save();
//     }

//     res.status(201).json(message);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Get messages for a user
// router.get('/api/messages/inbox/:username', isAuthenticated, async (req, res) => {
//   try {
//     const { username } = req.params;

//     // Find the user by username
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Populate the user's messages using the ref field in the user schema
//     const messages = await Message.find({
//       $or: [{ sender: username }, { recipient: username }],
//     });

//     res.json(messages);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;

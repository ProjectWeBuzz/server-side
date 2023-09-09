const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const User = require('../models/User.model'); 


// GET /api/profile

router.get("/profile/:username", isAuthenticated, async (req, res) => {
    try {
        const username = req.params.username;

        const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Return the user profile data as JSON
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

module.exports = router;

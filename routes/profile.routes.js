const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const User = require('../models/User.model'); 


router.get("/profile/:username", isAuthenticated, async (req, res) => {

  try {
      const username = req.params.username;
      const user = await User.findOne({ username: username });
      
      // if (!user) {
      //   return res.status(404).json({ error: "User not found" });
      // }
      res.status(200).json(user);
    } catch (err) {
      console.error("Error fetching user data:", err);
      res.status(500).json({ message: "Server error" });
    }
  });


  router.post("/update-profile/:username", isAuthenticated, async (req, res) => {
   
    try {
    
      const {username} = req.params;
      const { email, password, description, photo, sociallinks } = req.body;
     console.log(req.body)
      const updateFields = {
        email: email,
        password: password, 
        description: description || "",
        photo: photo ? photo : "",
        // sociallinks: sociallinks || ""
      };
    

      const updatedUser = await User.findOne({ username }, updateFields, { new: true });
      await updatedUser.save();
      res.json(updatedUser);
      console.log(updatedUser)

    } catch (err) {
      console.error("Error updating user data:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

  module.exports = router

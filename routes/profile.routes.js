const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const User = require('../models/User.model'); 


router.get("/profile/:username", isAuthenticated, async (req, res) => {
    console.log(req.headers)
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
    
      const username = req.params.username;
      const { email, password, description, photo, sociallinks } = req.body;
     
      const updateFields = {
        email: email || req.user.email,
        password: password || req.user.password,
        description: description || req.user.description,
        photo: photo || req.user.photo,
        sociallinks: sociallinks || req.user.sociallinks
      };
    

      const updatedUser = await User.findByIdAndUpdate(username, updateFields, { new: true });
      await updateFields.save();
      res.json(updatedUser);
      console.log(updatedUser)

    } catch (err) {
      console.error("Error updating user data:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

  module.exports = router

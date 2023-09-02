
const UserProfile  = require("../models/Project.model");

exports.getUserProfile = (req, res, next) => {
  // Assuming your UserProfile model has methods for finding user profile data
  UserProfile.findOne({ user: req.payload._id })
    .then((userProfile) => {
      if (!userProfile) {
        return res.status(404).json({ message: 'User profile not found.' });
      }
      return res.status(200).json({ user: userProfile });
    
    })
    .catch((error) => {
      console.error('Error fetching user profile:', error);
      return res.status(500).json({ message: 'Error fetching user profile.' });
    });
};



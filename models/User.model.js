const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    description: {
      type: String,
      required: false,
    },
    photo: {
      type:String,
      default: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
    },
    sociallinks: {
      type: [String],
    },
    projects: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project', 
      },
    ],
    },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

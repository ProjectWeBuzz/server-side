const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    senting: {
      type: String
    },
    receiving: {
      type: String
    },
    message: {
      type: String
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

//Create a collection of messages… ueEffect(target.localhost5), 
//accept get request from the message collection..


const User = model("User", userSchema);

module.exports = User;

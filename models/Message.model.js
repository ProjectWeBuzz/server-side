const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    sender: {
      type: String,
      required: [true, "Recipient email's is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    recipient: {
      type: String,
      required: [true, "Recipient email's is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    subject: {
      type: String
    },
    content: {
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


const Message = model("Message", messageSchema);

module.exports = Message;

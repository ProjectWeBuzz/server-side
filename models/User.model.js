const { Schema, model } = require("mongoose");


const userSchema = new Schema(
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
    projects: {
      type: [Schema.Types.ObjectId],
      ref: "Project" 
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
    }

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

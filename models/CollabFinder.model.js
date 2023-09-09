const { Schema, model } = require("mongoose");


const collabSchema = new Schema(
  {
    tags: {
      type: [Schema.Types.ObjectId],
      ref: "Project"
    },
    messaging: {
      type: String,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Collab = model("Collab", collabSchema);

module.exports = User;

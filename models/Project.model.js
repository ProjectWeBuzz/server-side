const { Schema, model } = require("mongoose");


const projectSchema = new Schema(
  {
    // owner:{
    //     type: [Schema.Types.ObjectId], ref: 'User'
    // },
    title: {
      type: String,
      required: [true, "Title is required."],
      unique: false,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      lowercase: true,
    },
    images: {
      type: String,
      required: false
    },
    tags: {
      type: [String],
      // validate: {
      //   validator: function (array){
      //       return array.length <=5;
      //   },
      //   message: 'The array can have at most 5 strings.'
      // }
    },
    // technologies: {
    //   type: String,
    //   required: false,
    //   enum: ['MongoDB', 'DOM', 'Photoshop', 'Illustrator'],
    // },
    // media: {
    //   type:String,
    //   required: false,
    //   enum: ['painting', 'digital design']
    // },
    sociallinksproject: {
      type: [String],
    },
    creationdate: {
        type: Date
    },
    // collabs: {
    //     type: [Schema.Types.ObjectId], ref: 'Collab'
    // },
    private: {
        type: Boolean,
        default: true
    }
    //this should be added through a function
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);


const Project = model("Project", projectSchema);

module.exports = Project;

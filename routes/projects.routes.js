const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
router.use(express.json());
const cloudinary = require('cloudinary').v2;

const Project = require("../models/Project.model");

const fileUploader = require('../config/cloudinary.config');

//  POST /api/projects  -  Creates a new project

router.post("/projects", fileUploader.array('images',10), async (req, res, next) => {
    console.log(req.body, req.files)
    const { title, description, tags, sociallinksproject, creationdate, isPrivate } = req.body;
    const imageUrls = [];

    for (const file of req.files) {
      const { path } = file;
      const result = await cloudinary.v2.uploader.upload(path);
      imageUrls.push(result.secure_url);
    }

    Project.create({ title, description, tags, images:imageUrls, sociallinksproject, creationdate, isPrivate})
      .then((response) => res.json(response))
      .catch((err) => {
        console.error('Error creating project:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });



//  GET /api/projects -  Retrieves all of the projects

router.get("/projects", (req, res, next) => {
    Project.find()
      //.populate("collabs")
      .then((allProjects) => res.json(allProjects))
      .catch((err) => res.json(err));
  });



//  GET /api/projects/:projectId -  Retrieves a specific project by id

router.get("/projects/:projectId", (req, res, next) => {
    const { projectId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

// Each Project document has `collabs` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
  Project.findById(projectId)
    //.populate("collabs")
    .then((project) => res.status(200).json(project))
    .catch((error) => res.json(error));
});




// PUT  /api/projects/:projectId  -  Updates a specific project by id
router.put("/projects/:projectId", (req, res, next) => {
    const { projectId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Project.findByIdAndUpdate(projectId, req.body, { new: true })
      .then((updatedProject) => res.json(updatedProject))
      .catch((error) => res.json(error));
  });

  

// DELETE  /api/projects/:projectId  -  Deletes a specific project by id
router.delete("/projects/:projectId", (req, res, next) => {
    const { projectId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Project.findByIdAndRemove(projectId)
      .then(() =>
        res.json({
          message: `Project with ${projectId} is removed successfully.`,
        })
      )
      .catch((error) => res.json(error));
  });
  
  module.exports = router;
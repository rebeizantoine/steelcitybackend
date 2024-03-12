const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectsSchema = new mongoose.Schema({
  projectImage: {
    type: String,
    required: false,
  },
  projectTitle: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  projectImage2: {
    type: String,
    required: false,
  },
  projectImage3: {
    type: String,
    required: false,
  },
  projectImage4: {
    type: String,
    required: false,
  },
  highlight1: {
    type: String,
    required: false,
  },
  highlight2: {
    type: String,
    required: false,
  },
  highlight3: {
    type: String,
    required: false,
  },
  highlight4: {
    type: String,
    required: false,
  },
  highlight5: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  owner: {
    type: String,
    required: false,
  },
  facilities: {
    type: String,
    required: false,
  },
  Design: {
    type: String,
    required: false,
  },
});

const Project = model("Project", projectsSchema);

module.exports = Project;

const Project = require("../models/projects");
const axios = require("axios");
const FormData = require("form-data");

const IMAGEBB_API_KEY = process.env.IMAGEBB_API_KEY;

// Image uploader function for multiple images
const imageUploader = async (files) => {
  try {
    const imageUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("key", IMAGEBB_API_KEY);

      if (!file || !file.buffer) {
        throw new Error("Image data is missing.");
      }

      const image = file.buffer.toString("base64");
      formData.append("image", image);

      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );

      console.log("ImgBB API Response:", response.data);

      const imageUrl = response?.data?.data?.url;
      imageUrls.push(imageUrl);
    }

    return imageUrls;
  } catch (error) {
    console.error("Error from ImgBB API:", error.response?.data);
    throw new Error("Failed to upload image(s) to ImgBB");
  }
};

// Create a new project with image upload
const createProject = async (req, res) => {
  try {
    // Use `upload.array()` to handle multiple files
    const images = req.files;

    // Upload multiple images and get their URLs
    const imageUrls = await imageUploader(images);

    // Create new project with multiple image URLs
    const newProject = await Project.create({
      projectTitle: req.body.projectTitle,
      projectDescription: req.body.projectDescription,
      projectImage: imageUrls[0] || null,
      projectImage2: imageUrls[1] || null,
      projectImage3: imageUrls[2] || null,
      projectImage4: imageUrls[3] || null,
      highlight1: req.body.highlight1 || null,
      highlight2: req.body.highlight2 || null,
      highlight3: req.body.highlight3 || null,
      highlight4: req.body.highlight4 || null,
      highlight5: req.body.highlight5 || null,
      location: req.body.location || null,
      owner: req.body.owner || null,
      facilities: req.body.facilities || null,
      design: req.body.design || null,
    });

    res.status(200).json({
      success: true,
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error) {
    console.error("Error in createProject:", error.message);
    if (error.message === "Failed to upload image(s) to ImgBB") {
      return res.status(400).json({
        success: false,
        message: "New Project not added successfully",
        error: "Failed to upload image(s) to ImgBB",
      });
    }
    res.status(400).json({
      success: false,
      message: "New Project not added successfully",
      error: error.message,
    });
  }
};

// Update a project with image upload
const updateProject = async (req, res) => {
  const projectId = req.params.id;
  try {
    let updatedData = {
      projectTitle: req.body.projectTitle,
      projectDescription: req.body.projectDescription,
      highlight1: req.body.highlight1 || null,
      highlight2: req.body.highlight2 || null,
      highlight3: req.body.highlight3 || null,
      highlight4: req.body.highlight4 || null,
      highlight5: req.body.highlight5 || null,
      location: req.body.location || null,
      owner: req.body.owner || null,
      facilities: req.body.facilities || null,
      design: req.body.design || null,
    };

    // Check if a new image is provided
    if (req.file) {
      // Upload the new image and get the image URL
      const newImageUrl = await imageUploader(req);
      updatedData.projectImage = newImageUrl;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId, // Corrected the id here
      { $set: updatedData },
      { new: true }
    );

    // Check if the service was found and updated
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllProject = async (req, res) => {
  try {
    const deletedallproject = await Project.deleteMany;
    if (!deletedallproject) {
      return res.status(404).json({ message: "Could not delete all" });
    }
    res.json({ message: "All Projects Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectByTitle = async (req, res) => {
  const { projectTitle } = req.params;
  try {
    const project = await Project.findOne({ projectTitle });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  deleteAllProject,
  getProjectByTitle,
};

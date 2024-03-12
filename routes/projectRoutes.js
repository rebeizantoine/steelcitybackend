const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  deleteAllProject,
  getProjectByTitle,
} = require("../controllers/projectController");

// Create a new project with image upload
router.post("/project/add", upload.array("projectImage", 4), createProject);

// Get all projects
router.get("/", getAllProjects);

router.get("/title/:projectTitle", getProjectByTitle);

// Get a single project by ID
router.get("/:id", getProjectById);

// Update a project by ID
router.put("/:id", updateProject);

router.delete("/project/deleteall", deleteAllProject);

// Delete a project by ID
router.delete("/:id", deleteProject);

module.exports = router;

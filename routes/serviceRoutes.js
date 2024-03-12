const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const express = require("express");
const router = express.Router();

const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceControllerimgbb");
router.post("/add", upload.single("serviceImage"), createService);

// Get all services
router.get("/", getAllServices);

// Get a single service by ID
router.get("/:id", getServiceById);

// Update a service by ID
router.put("/:id", upload.single("serviceImage"), updateService);

// Delete a service by ID
router.delete("/:id", deleteService);

module.exports = router;

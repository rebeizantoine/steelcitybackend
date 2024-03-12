const axios = require("axios");
const FormData = require("form-data");
const Service = require("../models/services");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Image uploader function using Cloudinary
const imageUploader = async (req) => {
  try {
    if (!req.file || !req.file.path) {
      throw new Error("Image file is missing.");
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    // Return the secure URL of the uploaded image
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

const createService = async (req, res) => {
  try {
    const serviceImage = await imageUploader(req);

    if (!serviceImage) {
      return res.status(400).json({
        success: false,
        message: "New Service not added successfully",
        error: "Image file is missing in the request",
      });
    }

    const newService = await Service.create({
      serviceTitle: req.body.serviceTitle,
      serviceDescription: req.body.serviceDescription,
      serviceImage,
    });

    res.status(200).json({
      success: true,
      message: "Service created successfully",
      data: newService,
    });
  } catch (error) {
    console.error("Error in createService:", error.message);
    if (error.message === "Failed to upload image to Cloudinary") {
      return res.status(400).json({
        success: false,
        message: "New Service not added successfully",
        error: "Failed to upload image to Cloudinary",
      });
    }
    res.status(400).json({
      success: false,
      message: "New Service not added successfully",
      error: error.message,
    });
  }
};

// The rest of your CRUD operations remain the same

const updateService = async (req, res) => {
  const { id } = req.params;
  try {
    let updatedData = {
      serviceTitle: req.body.serviceTitle,
      serviceDescription: req.body.serviceDescription,
    };

    // Check if a new image is provided
    if (req.file) {
      // Upload the new image and get the image URL
      const newImageUrl = await imageUploader(req);
      updatedData.serviceImage = newImageUrl;
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );

    // Check if the service was found and updated
    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// The rest of the CRUD operations remain the same
// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single service by ID
const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};

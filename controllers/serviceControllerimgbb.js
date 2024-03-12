const Service = require("../models/services");
const axios = require("axios");
const FormData = require("form-data");

const IMAGEBB_API_KEY = process.env.IMAGEBB_API_KEY;

// Image uploader function
const imageUploader = async (req) => {
  try {
    const formData = new FormData();
    formData.append("key", IMAGEBB_API_KEY);

    if (!req.file || !req.file.buffer) {
      throw new Error("Image data is missing.");
    }

    const image = req.file.buffer.toString("base64");
    formData.append("image", image);

    console.log("FormData:", formData);

    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData
    );

    console.log("ImgBB API Response:", response.data);

    return response?.data?.data?.url;
  } catch (error) {
    console.error("Error from ImgBB API:", error);
    throw new Error("Failed to upload image to ImgBB");
  }
};

const createService = async (req, res) => {
  try {
    const serviceImage = await imageUploader(req);

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
    if (error.message === "Failed to upload image to ImgBB") {
      return res.status(400).json({
        success: false,
        message: "New Service not added successfully",
        error: "Failed to upload image to ImgBB",
      });
    }
    res.status(400).json({
      success: false,
      message: "New Service not added successfully",
      error: error.message,
    });
  }
};

// Update a service with image upload
const updateService = async (req, res) => {
  const serviceId = req.params.id;
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
      serviceId,
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

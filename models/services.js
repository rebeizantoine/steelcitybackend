const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const servicesSchema = new mongoose.Schema({
  serviceImage: {
    type: String,
    required: false,
  },
  serviceTitle: {
    type: String,
    required: true,
  },
  serviceDescription: {
    type: String,
    required: true,
  },
});

const Service = model("Service", servicesSchema);

module.exports = Service;

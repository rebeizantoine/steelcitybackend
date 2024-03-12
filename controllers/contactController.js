const Contact = require("../models/contact");
const axios = require("axios");
const FormData = require("form-data");
const multer = require("multer");

// Create a new contact
const createContact = async (req, res) => {
  try {
    console.log("Received Contact Data:", req.body);

    if (req.file) {
      console.log("Received File:", req.file);
    }

    const contact = await Contact.create({
      phoneContact: req.body.phoneContact,
      phone2Contact: req.body.phone2Contact,
      linkfacebookContact: req.body.linkfacebookContact,
      linklinkedinContact: req.body.linklinkedinContact,
      linktwitterContact: req.body.linktwitterContact,
      linkpinterestContact: req.body.linkpinterestContact,
      emailContact: req.body.emailContact,
    });

    console.log("Created Contact:", contact);

    res.status(200).json({
      success: true,
      message: `Contact with phone ${req.body.phoneContact} added successfully`,
      data: contact,
    });
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(400).json({
      success: false,
      message: "Contact not added successfully",
      error: error.message,
    });
  }
};

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single contact by ID
const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a contact by ID
const updateContact = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteAllContacts = async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.json({ message: "All contacts deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  deleteAllContacts,
};

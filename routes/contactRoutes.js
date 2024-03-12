// routes/contactRoutes.js

const express = require("express");
const router = express.Router();
const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  deleteAllContacts,
} = require("../controllers/contactController");

router.post("/add", createContact);

// Delete all contacts
router.delete("/deleteAll", deleteAllContacts);

// Get all contacts
router.get("/", getAllContacts);

// Get a single contact by ID
router.get("/:id", getContactById);

// Update a contact by ID
router.put("/:id", updateContact);

// Delete a contact by ID
router.delete("/:id", deleteContact);

module.exports = router;

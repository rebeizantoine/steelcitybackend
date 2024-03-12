const express = require("express");
const router = express.Router();

const {
  getTerms,
  getTermById,
  updateTerms,
  addTerm,
  deleteTerm,
} = require("../controllers/termsofconditionController");

// GET request to fetch all terms
router.get("/terms", getTerms);

// GET request to fetch a term by ID
router.get("/terms/:termId", getTermById);

// PUT request to update terms
router.put("/terms/update/:termId", updateTerms);

// POST request to add a new term
router.post("/terms/add", addTerm);

// DELETE request to delete a term
router.delete("/terms/:termId", deleteTerm);

module.exports = router;

const Terms = require("../models/termsofcondition");

// Controller to handle the request to get all terms
const getTerms = async (req, res) => {
  try {
    const terms = await Terms.find();
    res.status(200).json(terms);
  } catch (error) {
    console.error("Error fetching terms:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to handle the request to get a term by ID
const getTermById = async (req, res) => {
  const { termId } = req.params;

  try {
    const term = await Terms.findById(termId);
    if (!term) {
      return res.status(404).json({ message: "Term not found" });
    }

    res.status(200).json(term);
  } catch (error) {
    console.error("Error fetching term:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to handle the request to update terms
const updateTerms = async (req, res) => {
  try {
    const updatedTerms = await Terms.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });

    res.status(200).json(updatedTerms);
  } catch (error) {
    console.error("Error updating terms:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to handle the request to add a new term
const addTerm = async (req, res) => {
  const newTerm = req.body;

  try {
    const term = await Terms.create(newTerm);
    // Explicitly select the fields to include in the response
    const { _id, termsofuse, privacypolicy, cookies, changestostatement } =
      term;
    res.status(201).json({
      message: "Term added successfully",
      term: { _id, termsofuse, privacypolicy, cookies, changestostatement },
    });
  } catch (error) {
    console.error("Error adding term:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to handle the request to delete a term
const deleteTerm = async (req, res) => {
  const { termId } = req.params;

  try {
    const deletedTerm = await Terms.findByIdAndDelete(termId);
    if (!deletedTerm) {
      return res.status(404).json({ message: "Term not found" });
    }

    res.status(200).json({ message: "Term deleted successfully" });
  } catch (error) {
    console.error("Error deleting term:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getTerms, getTermById, updateTerms, addTerm, deleteTerm };

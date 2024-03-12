const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contactsSchema = new mongoose.Schema({
  phoneContact: {
    type: Number,
  },

  phone2Contact: {
    type: Number,
  },
  linkfacebookContact: {
    type: String,
  },

  linklinkedinContact: {
    type: String,
  },
  linktwitterContact: {
    type: String,
  },
  linkpinterestContact: {
    type: String,
  },
  emailContact: {
    type: String,
  },
});

const Contact = model("Contact", contactsSchema);
module.exports = Contact;

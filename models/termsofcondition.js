const mongoose = require("mongoose");

const termsSchema = new mongoose.Schema({
  termsofuse1: { type: String },
  termsofuse2: { type: String },
  termsofuse3: { type: String },
  privacypolicy: { type: String },
  cookies: { type: String },
  changestostatement: {
    type: String,
  },
});
const Terms = mongoose.model("Terms", termsSchema);
module.exports = Terms;

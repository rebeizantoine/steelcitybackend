const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

async function dbConnection() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected successfully to the database!");
  } catch (error) {
    console.log(
      "Error occured while trying to connect to the database,",
      error
    );
  }
}
module.exports = dbConnection;

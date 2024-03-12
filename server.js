require("dotenv").config();
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnection = require("./config/db");
const servicesRouter = require("./routes/serviceRoutes");
const projectRouter = require("./routes/projectRoutes");
const contactRouter = require("./routes/contactRoutes");
const termsRouter = require("./routes/termsofconditionRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/services", servicesRouter);
app.use("/projects", projectRouter);
app.use("/contact", contactRouter);
app.use("/terms", termsRouter);

app.listen(port, () => {
  dbConnection();
  console.log(`Example app listening on port ${port}`);
});

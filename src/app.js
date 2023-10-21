require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const routes = require("./routes");
const path = require("node:path");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(fileUpload());
app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/v1/", routes);

if (process.env.NODE_ENV === "local") {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port ${process.env.PORT || 5000}`);
  });
}

module.exports = app;

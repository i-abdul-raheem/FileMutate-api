const router = require("express").Router();
const { CompressImage } = require("../handlers");

const handler = new CompressImage();
router.get("/", (req, res) => res.send("Test pass"));
router.post("/", handler.compressImage);

module.exports = router;

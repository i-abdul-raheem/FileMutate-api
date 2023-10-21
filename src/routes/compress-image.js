const router = require("express").Router();
const { CompressImage } = require("../handlers");

const handler = new CompressImage();
router.post("/", handler.compressImage);

module.exports = router;

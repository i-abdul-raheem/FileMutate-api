const router = require("express").Router();
const compressImage = require("./compress-image");

router.use("/compress-image", compressImage);

module.exports = router;

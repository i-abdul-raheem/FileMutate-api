const sharp = require("sharp");

class CompressImage {
  compressImage = async (req, res) => {
    try {
      const image = req.files.avatar;
      const { mimetype, data, name } = image;
      const temp = await sharp(data).webp({ quality: 20 }).toBuffer();
      return res
        .status(200)
        .json({ status: 200, data: { mimetype, buffer: temp, name } });
    } catch (error) {
      console.error(new Error(error));
      return res
        .status(500)
        .json({ message: "Internal Server Error", status: 500 });
    }
  };
}

module.exports = { CompressImage };

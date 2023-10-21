const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;
const { PassThrough } = require("stream");

class CompressImage {
  constructor() {
    // Configure Cloudinary with your Vercel environment variables
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  compressImage = async (req, res) => {
    try {
      const image = req.files.avatar;
      const { mimetype, data, name } = image;
      const temp = await sharp(data).webp({ quality: 20 }).toBuffer();

      // Convert the buffer to a readable stream
      const imageStream = new PassThrough();
      imageStream.end(temp);

      // Upload the compressed image to Cloudinary
      const cloudinaryUpload = cloudinary.uploader.upload_stream(
        {
          folder: "compressed-images",
          public_id: name, // Public ID (name) of the image
          format: "webp", // Force the format to WebP
        },
        (error, result) => {
          if (error) {
            console.error(error);
            return res
              .status(500)
              .json({ message: "Internal Server Error", status: 500 });
          } else {
            return res.status(200).json({
              status: 200,
              data: { mimetype: "image/webp", url: result.url },
            });
          }
        }
      );

      // Pipe the compressed image stream to Cloudinary upload stream
      imageStream.pipe(cloudinaryUpload);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", status: 500 });
    }
  };
}

module.exports = { CompressImage };

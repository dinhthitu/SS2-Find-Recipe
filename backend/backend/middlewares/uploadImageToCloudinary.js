const { v2: cloudinary } = require("cloudinary");
const streamifier = require("streamifier");
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

let configLogged = false;
if (!configLogged) {
  configLogged = true;
}

const uploadImageToCloudinary = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  try {
    const streamUpload = (file) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) resolve(result);
          else {
            console.error("Cloudinary upload error:", error);
            reject(error);
          }
        });
        streamifier.createReadStream(file.buffer).pipe(stream);
      });

    const result = await streamUpload(req.file);
    req.body.public_id = result?.public_id;
    req.body.file = result?.secure_url;
    next();
  } catch (error) {
    console.error("Cloudinary middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Error uploading image to Cloudinary",
    });
  }
};


<<<<<<< HEAD
module.exports = { uploadImageToCloudinary};
=======

module.exports = { uploadImageToCloudinary };
>>>>>>> cead9ca8478481f50cb9c01cf97e84f9dd0a7703

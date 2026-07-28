const cloudinary = require("../config/cloudinary.js");
const streamifier = require("streamifier");

const uploadBuffer = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || "uploads",
        resource_type: "image",
        public_id: options.publicId,
        overwrite: options.overwrite ?? true,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      },
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

const deleteFile = async (publicId) => {
  if (!publicId) return null;

  return cloudinary.uploader.destroy(publicId);
};

module.exports = {
  uploadBuffer,
  deleteFile,
};

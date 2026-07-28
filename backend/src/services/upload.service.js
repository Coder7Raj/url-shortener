const { uploadBuffer, deleteFile } = require("../utils/cloudinary.js");
const cloudinary = require("../config/cloudinary.js");

const uploadImage = async ({ buffer, folder, publicId }) => {
  const result = await uploadBuffer(buffer, {
    folder,
    publicId,
  });

  return {
    publicId: result.public_id,
    url: result.secure_url,
    format: result.format,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
  };
};

const removeImage = async (publicId) => {
  return deleteFile(publicId);
};

const getDownloadUrl = (publicId, filename) => {
  return cloudinary.url(publicId, {
    secure: true,
    resource_type: "image",
    format: "png",
    flags: "attachment",
    attachment: filename,
  });
};

module.exports = {
  uploadImage,
  removeImage,
  getDownloadUrl,
};

const { uploadBuffer, deleteFile } = require("../utils/cloudinary.js");

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

module.exports = {
  uploadImage,
  removeImage,
};

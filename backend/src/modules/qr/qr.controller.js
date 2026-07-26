const asyncHandler = require("../../utils/asyncHandler.js");
const ApiResponse = require("../../utils/apiResponse.js");
const service = require("./qr.service.js");

const generateQrCode = asyncHandler(async (req, res) => {
  const data = await service.generateQrCode(req.user.id, req.params.id);

  res
    .status(201)
    .json(new ApiResponse(201, "QR code generated successfully", data));
});

const getQrImage = asyncHandler(async (req, res) => {
  const { filePath, fileName } = await service.getQrImagePath(
    req.user.id,
    req.params.id,
  );

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);

  return res.sendFile(filePath);
});

module.exports = {
  generateQrCode,
  getQrImage,
};

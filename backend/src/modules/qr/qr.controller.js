const asyncHandler = require("../../utils/asyncHandler.js");
const ApiResponse = require("../../utils/apiResponse.js");
const service = require("./qr.service.js");

const generateQrCode = asyncHandler(async (req, res) => {
  const data = await service.generateQrCode(req.user.id, req.params.id);

  res
    .status(201)
    .json(new ApiResponse(201, "QR code generated successfully", data));
});

const getQrCode = asyncHandler(async (req, res) => {
  const data = await service.getQrCode(req.user.id, req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "QR Code fetched successfully", data));
});

const deleteQrCode = asyncHandler(async (req, res) => {
  const data = await service.deleteQrCode(req.user.id, req.params.id);

  res.status(200).json(new ApiResponse(200, data.message));
});

module.exports = {
  generateQrCode,
  getQrCode,
  deleteQrCode,
};

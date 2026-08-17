const asyncHandler = require("../../utils/asyncHandler.js");
const ApiResponse = require("../../utils/apiResponse.js");
const service = require("./qr.service.js");

const getRequestContext = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get("user-agent"),
});

const generateQrCode = asyncHandler(async (req, res) => {
  const data = await service.generateQrCode(
    req.user.id,
    req.params.id,
    getRequestContext(req),
  );

  res
    .status(201)
    .json(new ApiResponse(201, "QR code generated successfully", data));
});

const regenerateQrCode = asyncHandler(async (req, res) => {
  const data = await service.regenerateQrCode(
    req.user.id,
    req.params.id,
    getRequestContext(req),
  );

  res
    .status(200)
    .json(new ApiResponse(200, "QR Code regenerated successfully", data));
});

const getQrCode = asyncHandler(async (req, res) => {
  const data = await service.getQrCode(req.user.id, req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "QR Code fetched successfully", data));
});

const deleteQrCode = asyncHandler(async (req, res) => {
  const data = await service.deleteQrCode(
    req.user.id,
    req.params.id,
    getRequestContext(req),
  );

  res.status(200).json(new ApiResponse(200, data.message));
});

const downloadQrCode = asyncHandler(async (req, res) => {
  const data = await service.downloadQrCode(
    req.user.id,
    req.params.id,
    getRequestContext(req),
  );

  res
    .status(200)
    .json(new ApiResponse(200, "QR download URL generated successfully", data));
});

module.exports = {
  generateQrCode,
  getQrCode,
  deleteQrCode,
  downloadQrCode,
  regenerateQrCode,
};

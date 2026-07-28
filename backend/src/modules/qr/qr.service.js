const QRCode = require("qrcode");
const ApiError = require("../../utils/apiError.js");
const urlRepository = require("../urls/url.repository.js");
const qrRepository = require("./qr.repository.js");
const uploadService = require("../../services/upload.service.js");
const { toQrDto } = require("./qr.dto.js");

const getBaseUrl = () => {
  return process.env.BASE_URL || "http://localhost:5000";
};

const getShortUrl = (shortCode) => {
  return `${getBaseUrl()}/${shortCode}`;
};

const getPublicId = (url) => {
  return `url-shortener/qr/url-${url.url_id}`;
};

const validateOwnership = async (userId, urlId) => {
  const url = await urlRepository.findUrlById(urlId);

  if (!url || url.deleted_at) {
    throw new ApiError(404, "URL not found");
  }

  if (Number(url.user_id) !== Number(userId)) {
    throw new ApiError(403, "You don't have permission to access this URL");
  }

  return url;
};

const generateQrCode = async (userId, urlId) => {
  const url = await validateOwnership(userId, urlId);

  const shortUrl = getShortUrl(url.short_code);

  const buffer = await QRCode.toBuffer(shortUrl, {
    width: 600,
    margin: 2,
    errorCorrectionLevel: "H",
  });

  const uploaded = await uploadService.uploadImage({
    buffer,
    folder: "url-shortener/qrcodes",
    publicId: getPublicId(url),
  });

  const existingQr = await qrRepository.findQrByUrlId(urlId);

  let qr;

  if (existingQr) {
    qr = await qrRepository.updateQrCode(existingQr.qr_id, {
      image_path: uploaded.url,

      secure_url: uploaded.url,

      public_id: uploaded.publicId,

      width: uploaded.width,

      height: uploaded.height,

      bytes: uploaded.bytes,

      format: uploaded.format,
    });
  } else {
    qr = await qrRepository.createQrCode({
      url_id: BigInt(urlId),

      image_path: uploaded.url,

      secure_url: uploaded.url,

      public_id: uploaded.publicId,

      width: uploaded.width,

      height: uploaded.height,

      bytes: uploaded.bytes,

      format: uploaded.format,
    });
  }

  return toQrDto(url, qr);
};

const deleteQrCode = async (userId, urlId) => {
  const url = await validateOwnership(userId, urlId);

  const qr = await qrRepository.findQrByUrlId(urlId);

  if (!qr) {
    throw new ApiError(404, "QR code not found");
  }

  if (qr.public_id) {
    await uploadService.removeImage(qr.public_id);
  }

  await qrRepository.deleteQrCodesByUrlId(urlId);

  return {
    message: "QR code deleted successfully",
  };
};

const getQrCode = async (userId, urlId) => {
  const url = await validateOwnership(userId, urlId);

  const qr = await qrRepository.findQrByUrlId(urlId);

  if (!qr) {
    throw new ApiError(404, "QR code not found");
  }

  return toQrDto(url, qr);
};

const downloadQrCode = async (userId, urlId) => {
  const url = await validateOwnership(userId, urlId);

  const qr = await qrRepository.findQrByUrlId(urlId);

  if (!qr) {
    throw new ApiError(404, "QR Code not found");
  }

  const downloadUrl = uploadService.getDownloadUrl(
    qr.public_id,
    `${url.short_code}-qr`,
  );

  return {
    downloadUrl,
  };
};

module.exports = {
  generateQrCode,
  deleteQrCode,
  getQrCode,
  downloadQrCode,
};

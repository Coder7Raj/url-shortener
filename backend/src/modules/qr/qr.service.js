const QRCode = require("qrcode");
const ApiError = require("../../utils/apiError.js");
const urlRepository = require("../urls/url.repository.js");
const qrRepository = require("./qr.repository.js");
const uploadService = require("../../services/upload.service.js");
const { toQrDto } = require("./qr.dto.js");
const audit = require("../../common/audit");

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

const generateQrCode = async (userId, urlId, requestContext) => {
  const url = await validateOwnership(userId, urlId);

  let qr = await qrRepository.findQrByUrlId(urlId);

  if (!qr) {
    qr = await createOrUpdateQrCode(url);
  }

  await audit.qr.generated({
    userId,
    qr,
    requestContext,
  });

  return toQrDto(url, qr);
};

const regenerateQrCode = async (userId, urlId, requestContext) => {
  const url = await validateOwnership(userId, urlId);

  const existingQr = await qrRepository.findQrByUrlId(urlId);

  if (existingQr?.public_id) {
    await uploadService.removeImage(existingQr.public_id);
  }

  const qr = await createOrUpdateQrCode(url, existingQr);

  await audit.qr.regenerated({
    userId,
    qr,
    requestContext,
  });

  return toQrDto(url, qr);
};

const deleteQrCode = async (userId, urlId, requestContext) => {
  const url = await validateOwnership(userId, urlId);

  const qr = await qrRepository.findQrByUrlId(urlId);

  if (!qr) {
    throw new ApiError(404, "QR code not found");
  }

  if (qr.public_id) {
    await uploadService.removeImage(qr.public_id);
  }

  await audit.qr.deleted({
    userId,
    qr,
    requestContext,
  });

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

const downloadQrCode = async (userId, urlId, requestContext) => {
  const url = await validateOwnership(userId, urlId);

  const qr = await qrRepository.findQrByUrlId(urlId);

  if (!qr) {
    throw new ApiError(404, "QR Code not found");
  }

  const downloadUrl = uploadService.getDownloadUrl(
    qr.public_id,
    `${url.short_code}-qr`,
  );

  await audit.qr.downloaded({
    userId,
    qr,
    requestContext,
  });

  return {
    downloadUrl,
  };
};

const createOrUpdateQrCode = async (url, existingQr = null) => {
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

  if (existingQr) {
    return qrRepository.updateQrCode(existingQr.qr_id, {
      image_path: uploaded.url,
      secure_url: uploaded.url,
      public_id: uploaded.publicId,
      width: uploaded.width,
      height: uploaded.height,
      bytes: uploaded.bytes,
      format: uploaded.format,
    });
  }

  return qrRepository.createQrCode({
    url_id: BigInt(url.url_id),
    image_path: uploaded.url,
    secure_url: uploaded.url,
    public_id: uploaded.publicId,
    width: uploaded.width,
    height: uploaded.height,
    bytes: uploaded.bytes,
    format: uploaded.format,
  });
};

module.exports = {
  generateQrCode,
  deleteQrCode,
  getQrCode,
  downloadQrCode,
  createOrUpdateQrCode,
  regenerateQrCode,
};

const fs = require("fs/promises");
const path = require("path");
const QRCode = require("qrcode");

const ApiError = require("../../utils/apiError.js");
const urlRepository = require("../urls/url.repository.js");
const qrRepository = require("./qr.repository.js");
const { toQrDto } = require("./qr.dto.js");

const QR_DIR = path.join(process.cwd(), "uploads", "qrcodes");

const getBaseUrl = () => {
  return process.env.APP_URL || process.env.BASE_URL || "http://localhost:5000";
};

const getQrFileName = (urlId) => `qr-url-${urlId}.png`;

const getAbsoluteQrPath = (urlId) => {
  return path.join(QR_DIR, getQrFileName(urlId));
};

const getRelativeQrPath = (urlId) => {
  return `uploads/qrcodes/${getQrFileName(urlId)}`;
};

const ensureQrDirectory = async () => {
  await fs.mkdir(QR_DIR, { recursive: true });
};

const assertOwnedUrl = async (userId, urlId) => {
  const url = await urlRepository.findUrlById(urlId);

  if (!url || url.deleted_at) {
    throw new ApiError(404, "URL not found");
  }

  if (Number(url.user_id) !== Number(userId)) {
    throw new ApiError(403, "You don't have permission to manage this QR code");
  }

  return url;
};

const persistQrRecord = async (urlId, relativePath) => {
  const existingQr = await qrRepository.findQrByUrlId(urlId);

  if (existingQr) {
    return qrRepository.updateQrCode(existingQr.qr_id, {
      image_path: relativePath,
    });
  }

  return qrRepository.createQrCode({
    url_id: BigInt(urlId),
    image_path: relativePath,
  });
};

const writeQrFile = async (filePath, shortUrl) => {
  await QRCode.toFile(filePath, shortUrl, {
    width: 600,
    margin: 2,
    errorCorrectionLevel: "H",
  });
};

const generateQrCode = async (userId, urlId) => {
  const url = await assertOwnedUrl(userId, urlId);

  await ensureQrDirectory();

  const absolutePath = getAbsoluteQrPath(urlId);
  const relativePath = getRelativeQrPath(urlId);
  const shortUrl = `${getBaseUrl()}/${url.short_code}`;

  await writeQrFile(absolutePath, shortUrl);

  const qrRecord = await persistQrRecord(urlId, relativePath);

  return toQrDto({
    url,
    qrRecord,
    shortUrl,
    imagePath: relativePath,
  });
};

const getQrImagePath = async (userId, urlId) => {
  const url = await assertOwnedUrl(userId, urlId);

  await ensureQrDirectory();

  const absolutePath = getAbsoluteQrPath(urlId);
  const relativePath = getRelativeQrPath(urlId);
  const shortUrl = `${getBaseUrl()}/${url.short_code}`;

  try {
    await fs.access(absolutePath);
  } catch {
    await writeQrFile(absolutePath, shortUrl);
    await persistQrRecord(urlId, relativePath);
  }

  return {
    filePath: absolutePath,
    fileName: getQrFileName(urlId),
  };
};

module.exports = {
  generateQrCode,
  getQrImagePath,
};

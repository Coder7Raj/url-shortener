const getBaseUrl = () => {
  return process.env.BASE_URL || "http://localhost:5000";
};

const toQrDto = (url, qr) => ({
  url: {
    id: Number(url.url_id),
    shortCode: url.short_code,
    originalUrl: url.original_url,
    title: url.title,
    status: url.status,
  },

  qrCode: {
    id: Number(qr.qr_id),

    imageUrl: qr.secure_url,

    publicId: qr.public_id,

    width: qr.width,

    height: qr.height,

    bytes: qr.bytes,

    format: qr.format,

    createdAt: qr.created_at,

    updatedAt: qr.updated_at,
  },
});

module.exports = {
  toQrDto,
};

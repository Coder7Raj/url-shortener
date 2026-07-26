const getBaseUrl = () => {
  return process.env.APP_URL || process.env.BASE_URL || "http://localhost:5000";
};

const toQrDto = ({ url, qrRecord, shortUrl, imagePath }) => {
  const urlId = Number(url.url_id);

  return {
    url: {
      id: urlId,
      shortCode: url.short_code,
      originalUrl: url.original_url,
      title: url.title,
      status: url.status,
    },
    qrCode: {
      id: Number(qrRecord.qr_id),
      imagePath,
      shortUrl,
      qrCodeUrl: `${getBaseUrl()}/api/v1/urls/${urlId}/qr`,
      createdAt: qrRecord.created_at,
      updatedAt: qrRecord.updated_at,
    },
  };
};

module.exports = {
  toQrDto,
};

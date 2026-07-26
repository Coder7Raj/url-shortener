const prisma = require("../../config/prisma.js");

const findQrByUrlId = async (urlId) => {
  return prisma.qr_codes.findFirst({
    where: {
      url_id: BigInt(urlId),
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

const createQrCode = async (data) => {
  return prisma.qr_codes.create({
    data,
  });
};

const updateQrCode = async (qrId, data) => {
  return prisma.qr_codes.update({
    where: {
      qr_id: BigInt(qrId),
    },
    data,
  });
};

const deleteQrCodesByUrlId = async (urlId) => {
  return prisma.qr_codes.deleteMany({
    where: {
      url_id: BigInt(urlId),
    },
  });
};

module.exports = {
  findQrByUrlId,
  createQrCode,
  updateQrCode,
  deleteQrCodesByUrlId,
};

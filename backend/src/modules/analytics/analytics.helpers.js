const ApiError = require("../../utils/apiError.js");

const getOwnedUrl = async (repository, userId, urlId) => {
  const url = await repository.findUrl(urlId);

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  if (Number(url.user_id) !== Number(userId)) {
    throw new ApiError(403, "You don't have permission to access this URL");
  }

  if (url.deleted_at) {
    throw new ApiError(404, "URL not found");
  }

  return url;
};

const calculateStartDate = (range = "30d") => {
  const date = new Date();

  switch (range) {
    case "7d":
      date.setDate(date.getDate() - 7);
      break;

    case "30d":
      date.setDate(date.getDate() - 30);
      break;

    case "90d":
      date.setDate(date.getDate() - 90);
      break;

    case "365d":
      date.setDate(date.getDate() - 365);
      break;

    default:
      date.setDate(date.getDate() - 30);
  }

  date.setHours(0, 0, 0, 0);

  return date;
};

module.exports = {
  getOwnedUrl,
  calculateStartDate,
};

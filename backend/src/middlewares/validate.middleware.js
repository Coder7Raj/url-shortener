const ApiError = require("../utils/apiError.js");

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      return next(new ApiError(400, result.error.issues[0].message));
    }

    req.body = result.data.body || req.body;
    req.params = result.data.params || req.params;
    req.query = result.data.query || req.query;

    next();
  };
};

module.exports = validate;

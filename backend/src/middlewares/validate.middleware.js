const ApiError = require("../utils/apiError.js");

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return next(new ApiError(400, result.error.issues[0].message));
    }

    req.validated = result.data;

    next();
  };
};

module.exports = validate;

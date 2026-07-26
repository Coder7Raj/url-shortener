const ApiError = require("../utils/apiError.js");

const validate = (schema) => {
  return (req, res, next) => {
    // 1) Try old-style schemas: z.object({ username, email, ... })
    const directResult = schema.safeParse(req.body);

    if (directResult.success) {
      req.validated = {
        body: directResult.data,
        params: req.params,
        query: req.query,
      };

      req.body = directResult.data;
      return next();
    }

    // 2) Try wrapped schemas: z.object({ body: ..., params: ..., query: ... })
    const wrappedResult = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (wrappedResult.success) {
      req.validated = wrappedResult.data;

      req.body = wrappedResult.data.body ?? req.body ?? {};
      req.params = wrappedResult.data.params ?? req.params ?? {};
      req.query = wrappedResult.data.query ?? req.query ?? {};

      return next();
    }

    const firstIssue =
      directResult.error?.issues?.[0] || wrappedResult.error?.issues?.[0];

    return next(new ApiError(400, firstIssue?.message || "Invalid input"));
  };
};

module.exports = validate;

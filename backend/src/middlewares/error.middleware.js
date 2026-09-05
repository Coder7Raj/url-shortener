const { ZodError } = require("zod");

const ApiError = require("../utils/apiError.js");

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  // ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  // Zod validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      })),
    });
  }

  // Request body too large
  if (err.type === "entity.too.large") {
    return res.status(413).json({
      success: false,
      statusCode: 413,
      message: "Request payload is too large",
    });
  }

  // Malformed JSON
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Invalid JSON payload",
    });
  }

  // Prisma errors
  // Unique constraint violation
  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      statusCode: 409,
      message: "A resource with the same value already exists",
    });
  }

  // Record not found
  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: "Resource not found",
    });
  }

  // Unknown error
  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Internal Server Error",
  });
};

module.exports = errorMiddleware;

const ApiError = require("../utils/apiError.js");

const repository = require("../modules/auth/auth.repository.js");

const { verifyAccessToken } = require("../services/jwt.services.js");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError(401, "Authentication required"));
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyAccessToken(token);

    const user = await repository.findUserById(payload.userId);

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    if (!user.is_active) {
      return next(new ApiError(403, "Account is deactivated"));
    }

    if (user.deleted_at) {
      return next(new ApiError(403, "Account has been deleted"));
    }

    req.user = {
      id: Number(user.user_id),
      username: user.username,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error);
    return next(error);
  }
};

module.exports = authMiddleware;

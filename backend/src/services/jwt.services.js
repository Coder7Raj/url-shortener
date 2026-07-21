const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      sub: Number(user.user_id),
      role: user.role,
      type: "access",
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    },
  );
};

const generateRefreshToken = (user) => {
  const tokenId = uuidv4();

  const refreshToken = jwt.sign(
    {
      sub: Number(user.user_id),
      jti: tokenId,
      type: "refresh",
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    },
  );

  return {
    refreshToken,
    tokenId,
  };
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};

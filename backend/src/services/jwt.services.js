const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const env = require("../config/env.js");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      sub: Number(user.user_id),
      role: user.role,
      type: "access",
    },
    env.jwtAccessSecret,
    {
      expiresIn: env.accessTokenExpires,
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
    env.jwtRefreshSecret,
    {
      expiresIn: env.refreshTokenExpires,
    },
  );

  return {
    refreshToken,
    tokenId,
  };
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, env.jwtAccessSecret);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.jwtRefreshSecret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};

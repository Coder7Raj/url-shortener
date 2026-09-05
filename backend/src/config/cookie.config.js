const env = require("../config/env.js");

const isProduction = env.nodeEnv === "production";

const baseCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
};

const accessCookieOptions = {
  ...baseCookieOptions,
  maxAge: 6 * 60 * 60 * 1000,
  path: "/",
};

const refreshCookieOptions = {
  ...baseCookieOptions,
  maxAge: 30 * 24 * 60 * 60 * 1000,
  path: "/api/v1/auth",
};

module.exports = {
  accessCookieOptions,
  refreshCookieOptions,
};

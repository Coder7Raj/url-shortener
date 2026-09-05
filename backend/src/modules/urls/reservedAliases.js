const RESERVED_ALIASES = new Set([
  "api",
  "admin",
  "auth",
  "dashboard",
  "analytics",
  "login",
  "register",
  "logout",
  "profile",
  "sessions",
  "qr",
  "urls",
  "health",
  "favicon.ico",
  "robots.txt",
]);

const isReservedAlias = (alias) => {
  return RESERVED_ALIASES.has(alias.toLowerCase());
};

module.exports = {
  RESERVED_ALIASES,
  isReservedAlias,
};

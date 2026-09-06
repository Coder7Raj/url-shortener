const requiredEnvVariables = [
  "DATABASE_URL",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "CLIENT_URL",
];

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
}

const nodeEnv = process.env.NODE_ENV || "development";

const clientUrls = process.env.CLIENT_URL.split(",")
  .map((url) => url.trim())
  .filter(Boolean);

if (clientUrls.length === 0) {
  throw new Error("CLIENT_URL must contain at least one URL");
}

if (nodeEnv === "production") {
  if (process.env.JWT_ACCESS_SECRET.length < 32) {
    throw new Error(
      "JWT_ACCESS_SECRET must be at least 32 characters in production",
    );
  }

  if (process.env.JWT_REFRESH_SECRET.length < 32) {
    throw new Error(
      "JWT_REFRESH_SECRET must be at least 32 characters in production",
    );
  }

  if (process.env.JWT_ACCESS_SECRET === process.env.JWT_REFRESH_SECRET) {
    throw new Error(
      "JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be different",
    );
  }

  for (const url of clientUrls) {
    if (!url.startsWith("https://")) {
      throw new Error("Production CLIENT_URL must use HTTPS");
    }
  }
}

const env = {
  nodeEnv,

  isProduction: nodeEnv === "production",

  isDevelopment: nodeEnv === "development",

  port: Number(process.env.PORT) || 3000,

  clientUrl: clientUrls[0],

  clientUrls,

  databaseUrl: process.env.DATABASE_URL,

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,

  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

  accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES || "15m",

  refreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRES || "30d",
};

module.exports = env;

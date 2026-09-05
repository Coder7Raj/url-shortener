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

const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT) || 3000,

  clientUrl: process.env.CLIENT_URL,

  databaseUrl: process.env.DATABASE_URL,

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,

  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

  accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES || "15m",

  refreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRES || "7d",
};

module.exports = env;

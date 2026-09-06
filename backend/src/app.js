require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/routes.js");
const errorMiddleware = require("./middlewares/error.middleware.js");
const notFound = require("./middlewares/notFound.middleware.js");
// const analyticsRoutes = require("./modules/analytics/analytics.routes.js");
const {
  globalRateLimiter,
} = require("./middlewares/rateLimiter.middleware.js");
const env = require("./config/env.js");

const app = express();

app.disable("x-powered-by");

if (env.isProduction) {
  app.set("trust proxy", 1);
}

app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (env.clientUrls.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS: Origin not allowed"), false);
    },

    credentials: true,

    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],

    optionsSuccessStatus: 204,
  }),
);

app.use(
  express.json({
    limit: "50kb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50kb",
  }),
);

app.use(cookieParser());

app.use(compression());

app.use(morgan("dev"));

app.use(globalRateLimiter);

app.use("/api/v1", routes);

// app.use("/api/v1/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "URL Shortener API Running",
  });
});

app.use(notFound);

app.use(errorMiddleware);

module.exports = app;

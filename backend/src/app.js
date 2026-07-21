require("dotenv").config();
const prisma = require("./config/prisma.js");

const express = require("express");

const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/routes.js");
const errorMiddleware = require("./middlewares/error.middleware.js");
const notFound = require("./middlewares/notFound.middleware.js");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(morgan("dev"));

app.use("/api/v1", routes);

app.use(notFound);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "URL Shortener API Running 🚀",
  });
});

module.exports = app;

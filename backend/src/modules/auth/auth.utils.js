const bcrypt = require("bcrypt");

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const hashToken = async (token) => {
  return bcrypt.hash(token, 12);
};

const compareToken = async (plainToken, hashedToken) => {
  return bcrypt.compare(plainToken, hashedToken);
};

module.exports = {
  comparePassword,
  hashToken,
  compareToken,
};

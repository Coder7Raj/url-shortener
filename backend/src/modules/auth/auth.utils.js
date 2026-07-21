const bcrypt = require("bcrypt");

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const hashToken = async (token) => {
  return bcrypt.hash(token, 12);
};

module.exports = {
  comparePassword,
  hashToken,
};

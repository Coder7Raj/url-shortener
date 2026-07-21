const { customAlphabet } = require("nanoid");

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const nanoid = customAlphabet(alphabet, 7);

const generateShortCode = () => {
  return nanoid();
};

module.exports = {
  generateShortCode,
};

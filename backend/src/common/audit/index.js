const service = require("./audit.service.js");
const events = require("./audit.events.js");

module.exports = {
  ...service,
  ...events,
};

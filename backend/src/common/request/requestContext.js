const buildRequestContext = (req) => {
  return {
    ipAddress: req.ip,
    userAgent: req.get("user-agent"),
    deviceName: req.get("x-device-name") || null,
  };
};

module.exports = {
  buildRequestContext,
};

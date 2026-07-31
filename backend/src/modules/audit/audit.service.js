const repository = require("./audit.repository.js");

const log = async ({
  userId,
  action,
  entityType,
  entityId = null,
  metadata = null,
  ipAddress = null,
  userAgent = null,
}) => {
  return repository.createLog({
    user_id: BigInt(userId),

    action,

    entity_type: entityType,

    entity_id: entityId !== null ? BigInt(entityId) : null,

    metadata,

    ip_address: ipAddress,

    user_agent: userAgent,
  });
};

module.exports = {
  log,
};

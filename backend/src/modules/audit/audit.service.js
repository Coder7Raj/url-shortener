const repository = require("./audit.repository.js");

const log = async ({
  userId,
  action,
  entityType,
  entityId = null,
  metadata = null,
  requestContext = {},
}) => {
  return repository.createLog({
    user_id: BigInt(userId),

    action,

    entity_type: entityType,

    entity_id: entityId !== null ? BigInt(entityId) : null,

    metadata,

    ip_address: requestContext.ipAddress ?? null,

    user_agent: requestContext.userAgent ?? null,
  });
};

module.exports = {
  log,
};

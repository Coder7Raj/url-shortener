const service = require("./audit.service.js");
const { AUDIT_ACTIONS, AUDIT_ENTITIES } = require("./audit.constants.js");

/*
    | URL EVENTS
*/

const urlCreated = async ({ userId, url, requestContext }) => {
  return service.log({
    userId,
    action: AUDIT_ACTIONS.CREATED,
    entityType: AUDIT_ENTITIES.URL,
    entityId: url.url_id,
    metadata: {
      shortCode: url.short_code,
      originalUrl: url.original_url,
      title: url.title,
      status: url.status,
    },

    requestContext,
  });
};

const urlUpdated = async ({ userId, url, changes, requestContext }) => {
  return service.log({
    userId,
    action: AUDIT_ACTIONS.UPDATED,
    entityType: AUDIT_ENTITIES.URL,
    entityId: url.url_id,
    metadata: {
      shortCode: url.short_code,
      changes,
    },

    requestContext,
  });
};

const urlDeleted = async ({ userId, url, requestContext }) => {
  return service.log({
    userId,
    action: AUDIT_ACTIONS.DELETED,
    entityType: AUDIT_ENTITIES.URL,
    entityId: url.url_id,
    metadata: {
      shortCode: url.short_code,
    },

    requestContext,
  });
};

const urlRestored = async ({ userId, url, requestContext }) => {
  return service.log({
    userId,
    action: AUDIT_ACTIONS.RESTORED,
    entityType: AUDIT_ENTITIES.URL,
    entityId: url.url_id,
    metadata: {
      shortCode: url.short_code,
    },

    requestContext,
  });
};

module.exports = {
  urlCreated,
  urlUpdated,
  urlDeleted,
  urlRestored,
};

const service = require("./audit.service.js");
const { AUDIT_ACTIONS, AUDIT_ENTITIES } = require("./audit.constants.js");

/*
    | URL
*/

const url = {
  created: async ({ userId, url, requestContext }) =>
    service.log({
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
    }),

  updated: async ({ userId, url, changes, requestContext }) =>
    service.log({
      userId,
      action: AUDIT_ACTIONS.UPDATED,
      entityType: AUDIT_ENTITIES.URL,
      entityId: url.url_id,
      metadata: {
        shortCode: url.short_code,
        changes,
      },
      requestContext,
    }),

  deleted: async ({ userId, url, requestContext }) =>
    service.log({
      userId,
      action: AUDIT_ACTIONS.DELETED,
      entityType: AUDIT_ENTITIES.URL,
      entityId: url.url_id,
      metadata: {
        shortCode: url.short_code,
      },
      requestContext,
    }),

  restored: async ({ userId, url, requestContext }) =>
    service.log({
      userId,
      action: AUDIT_ACTIONS.RESTORED,
      entityType: AUDIT_ENTITIES.URL,
      entityId: url.url_id,
      metadata: {
        shortCode: url.short_code,
      },
      requestContext,
    }),
};

/*
    | QR
*/

const qr = {
  generated: async ({ userId, qr, requestContext }) =>
    service.log({
      userId,
      action: AUDIT_ACTIONS.CREATED,
      entityType: AUDIT_ENTITIES.QR_CODE,
      entityId: qr.qr_id,
      metadata: {
        urlId: Number(qr.url_id),
        imageUrl: qr.image_path,
      },
      requestContext,
    }),

  regenerated: async ({ userId, qr, requestContext }) =>
    service.log({
      userId,
      action: AUDIT_ACTIONS.REGENERATED,
      entityType: AUDIT_ENTITIES.QR_CODE,
      entityId: qr.qr_id,
      metadata: {
        imageUrl: qr.image_path,
        publicId: qr.public_id,
      },

      requestContext,
    }),

  downloaded: async ({ userId, qr, requestContext }) =>
    service.log({
      userId,
      action: AUDIT_ACTIONS.QR_DOWNLOADED,
      entityType: AUDIT_ENTITIES.QR_CODE,
      entityId: qr.qr_id,
      metadata: {
        imageUrl: qr.image_path,
      },
      requestContext,
    }),

  deleted: async ({ userId, qr, requestContext }) =>
    service.log({
      userId,
      action: AUDIT_ACTIONS.DELETED,
      entityType: AUDIT_ENTITIES.QR_CODE,
      entityId: qr.qr_id,
      metadata: null,
      requestContext,
    }),
};

module.exports = {
  url,
  qr,
};

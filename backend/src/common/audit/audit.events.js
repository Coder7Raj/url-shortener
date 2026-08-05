const service = require("./audit.service.js");
const { AUDIT_ACTIONS, AUDIT_ENTITIES } = require("./audit.constants.js");

/*
    | URL
*/
const url = {
  created: async ({ userId, url, requestContext }) =>
    service.log({
      userId,
      action: AUDIT_ACTIONS.URL.URL_CREATED,
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
      action: AUDIT_ACTIONS.URL.URL_UPDATED,
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
      action: AUDIT_ACTIONS.URL.URL_DELETED,
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
      action: AUDIT_ACTIONS.URL.URL_RESTORED,
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
      action: AUDIT_ACTIONS.QR.QR_CREATED,
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
      action: AUDIT_ACTIONS.QR.QR_REGENERATED,
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
      action: AUDIT_ACTIONS.QR.QR_DOWNLOADED,
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
      action: AUDIT_ACTIONS.QR.QR_DELETED,
      entityType: AUDIT_ENTITIES.QR_CODE,
      entityId: qr.qr_id,
      metadata: null,
      requestContext,
    }),
};

/*
    | AUTH
*/
const auth = {
  login: async ({ userId, requestContext }) =>
    service.log({
      userId,
      action: AUDIT_ACTIONS.AUTH.LOGIN,
      entityType: AUDIT_ENTITIES.USER,
      entityId: userId,
      metadata: {
        loginMethod: "password",
        sessionType: "refresh",
        // device: requestContext.userAgent,
        // ip: requestContext.ip,
      },
      requestContext,
    }),

  logout: async ({ userId, requestContext }) =>
    service.log({
      userId,
      action: AUDIT_ACTIONS.AUTH.LOGOUT,
      entityType: AUDIT_ENTITIES.USER,
      entityId: userId,
      metadata: {
        logoutType: "single_session",
      },
      requestContext,
    }),

  logoutAll: async ({ userId, requestContext }) =>
    service.log({
      userId,
      action: AUDIT_ACTIONS.AUTH.LOGOUT_ALL,
      entityType: AUDIT_ENTITIES.USER,
      entityId: userId,
      metadata: {
        logoutType: "all_sessions",
      },
      requestContext,
    }),

  refreshToken: async ({ userId, requestContext }) =>
    service.log({
      userId,
      action: AUDIT_ACTIONS.AUTH.REFRESH_TOKEN,
      entityType: AUDIT_ENTITIES.SESSION,
      entityId: userId,
      metadata: {
        action: "refresh_token",
      },
      requestContext,
    }),
};

module.exports = {
  url,
  qr,
  auth,
};

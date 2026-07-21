const toSessionResponse = (session) => ({
  sessionId: Number(session.session_id),
  deviceName: session.device_name,
  ipAddress: session.ip_address,
  userAgent: session.user_agent,
  createdAt: session.created_at,
  expiresAt: session.expires_at,
});

const toSessionListResponse = (sessions) => {
  return sessions.map(toSessionResponse);
};

module.exports = {
  toSessionResponse,
  toSessionListResponse,
};

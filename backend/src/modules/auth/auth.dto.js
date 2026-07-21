const toUserResponse = (user) => {
  return {
    id: Number(user.user_id),
    username: user.username,
    name: user.name,
    email: user.email,
    profilePicture: user.profile_picture,
    role: user.role,
    emailVerified: user.email_verified,
    isActive: user.is_active,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
};

module.exports = {
  toUserResponse,
};

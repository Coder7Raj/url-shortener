const calculateRefreshTokenExpiry = () => {
  const expiresInDays = 30;

  return new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);
};

module.exports = {
  calculateRefreshTokenExpiry,
};

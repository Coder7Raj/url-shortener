const asyncHandler = require("../../utils/asyncHandler.js");
const ApiResponse = require("../../utils/apiResponse.js");

const service = require("./admin.service.js");

const getDashboard = asyncHandler(async (req, res) => {
  const data = await service.getDashboard();

  res
    .status(200)
    .json(new ApiResponse(200, "Admin dashboard fetched successfully", data));
});

const getAnalytics = asyncHandler(async (req, res) => {
  const data = await service.getAnalytics(req.query.days);

  res
    .status(200)
    .json(new ApiResponse(200, "Admin analytics fetched successfully", data));
});

const getUsers = asyncHandler(async (req, res) => {
  const data = await service.getUsers({
    page: req.query.page,
    limit: req.query.limit,
    search: req.query.search,
    role: req.query.role,
    status: req.query.status,
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Users fetched successfully", data));
});

const getUserDetails = asyncHandler(async (req, res) => {
  const data = await service.getUserDetails(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "User details fetched successfully", data));
});

const updateUserStatus = asyncHandler(async (req, res) => {
  const { is_active } = req.validated.body;

  const data = await service.updateUserStatus(
    req.params.id,
    is_active,
    req.user,
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        `User ${is_active ? "activated" : "deactivated"} successfully`,
        data,
      ),
    );
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.validated.body;

  const data = await service.updateUserRole(req.params.id, role, req.user);

  res
    .status(200)
    .json(new ApiResponse(200, "User role updated successfully", data));
});

const deleteUser = asyncHandler(async (req, res) => {
  const data = await service.deleteUser(req.params.id, req.user);

  res.status(200).json(new ApiResponse(200, "User deleted successfully", data));
});

const getAllSessions = asyncHandler(async (req, res) => {
  const data = await service.getAllSessions(req.validated.query);

  res
    .status(200)
    .json(new ApiResponse(200, "Sessions fetched successfully", data));
});

const revokeSession = asyncHandler(async (req, res) => {
  const data = await service.revokeSession(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Session revoked successfully", data));
});

module.exports = {
  getDashboard,
  getAnalytics,
  getUsers,
  getUserDetails,
  updateUserStatus,
  updateUserRole,
  deleteUser,
  getAllSessions,
  revokeSession,
};

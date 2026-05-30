import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { withMetrics } from "../utils/metrics.logger.js";

export const getAllUsers = asyncHandler(async (req, res) => {
   const filter = req.query.role ? { role: req.query.role } : {};

  const users = await withMetrics(
      "DB | Get all Users | Admin | filter: role ",
      () => User.find(filter).select("-password")
  );

  return res
    .status(200)
    .json(new ApiResponse(200, users, "All users fetched successfully"));
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await withMetrics(
      "DB | Get User By ID | Admin | filter: byId",
      () => User.findById(req.params.id).select("-password")
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params; 
  
  const userToUpdate = await User.findById(id);
  if (!userToUpdate) {
    throw new ApiError(404, "User not found");
  }

  if (userToUpdate.role === "admin" && req.user._id.toString() !== id) {
    throw new ApiError(403, "Admins cannot edit other admins.");
  }

  const { name, contact, address, areacode, role, status } = req.body;
  const updateData = { name, contact, address, areacode, role, status };
  Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

  const updatedUser = await withMetrics(
      "DB | Update User | Admin | filter: byId",
      () => User.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select("-password")
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params; 

  if (req.user._id.toString() === id) {
    throw new ApiError(403, "You cannot delete your own account.");
  }

  const userToDelete = await User.findById(id);
  if (!userToDelete) {
    throw new ApiError(404, "User not found");
  }

  if (userToDelete.role === "admin") {
    throw new ApiError(403, "Admins cannot delete other admins.");
  }
  
  await withMetrics(
      "DB | Delete User | Admin | filter: byId",
      () => User.findByIdAndDelete(id)
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted successfully"));
});
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  COOKIE_OPTIONS,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  ADMIN_SECRET_CODE,  
  COLLECTOR_SECRET_CODE,  
} from "../constants.js";
import { withMetrics } from "../utils/metrics.logger.js";
 
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = jwt.sign(
      { _id: user._id, role: user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
    const refreshToken = jwt.sign(
      { _id: user._id },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRY }
    );
 
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};
 
const generateUniqueUserCode = async () => {
  let code;
  let isUnique = false;
  while (!isUnique) {
    code = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const existingUser = await User.findOne({ code });
    if (!existingUser) {
      isUnique = true;
    }
  }
  return code;
};
 

export const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    contact,
    areacode,
    address,
    status,
    code, 
  } = req.body;

  if (
    [name, email, password, contact, areacode, address].some((f) => !f?.trim())
  ) {
    throw new ApiError(400, "All required fields must be filled");
  }

  const existingUser = await User.findOne({ $or: [{ email }, { name }] });
  if (existingUser) {
    throw new ApiError(409, "User with this email or name already exists");
  }

  let role = "citizen"; 
  if (status && status.trim() !== "") {
    role = "organisation";
  } else if (code) {
    if (code === ADMIN_SECRET_CODE) {
      role = "admin";
    } else if (code === COLLECTOR_SECRET_CODE) {
      role = "collector";
    }
  }

  const userCode = await generateUniqueUserCode();

  const user = await withMetrics(
      "DB | Create User | filter: none",
      () => User.create({
        code: userCode,
        name,
        email,
        password,
        contact,
        areacode,
        address,
        role,
        status: status || "",
      })
  );

  const createdUser = await User.findById(user._id).select("-password")
  if (!createdUser) {
    throw new ApiError(500, "Failed to register user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { loginIdentifier, password } = req.body;  

  if (!loginIdentifier || !password) {
    throw new ApiError(400, "Email/Name and password are required");
  }

  const user = await withMetrics(
      "DB | Login User Check | filter: email or name",
      () => User.findOne({
        $or: [{ email: loginIdentifier }, { name: loginIdentifier }],
      })
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
})

export const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .clearCookie("refreshToken", COOKIE_OPTIONS)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export const getMyProfile = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, req.user, "User profile fetched successfully")
    );
});

export const updateMyProfile = asyncHandler(async (req, res) => {
  const { name, contact, address, status, email, areacode } = req.body;

  const user = await withMetrics(
      "DB | Update own data | filter: byId",
      () => User.findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            name,
            contact,
            address,
            status,
            email,    
            areacode, 
          },
        },
        { new: true, runValidators: true }
      ).select("-password")
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile updated successfully"));
});

export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old password and new password are required");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordMatch = await user.comparePassword(oldPassword);
  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid old password");
  }

  user.password = newPassword;
  
  await withMetrics(
      "DB | Change Password Save | filter: none",
      () => user.save({ validateBeforeSave: false })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});
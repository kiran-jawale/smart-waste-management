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
  ADMIN_SECRET_CODE, // Add this to constants.js
  COLLECTOR_SECRET_CODE, // Add this to constants.js
} from "../constants.js";

// --- Helper Function to Generate Tokens ---
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
    // Note: You would typically save the refreshToken in the user model
    // user.refreshToken = refreshToken;
    // await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

// --- Helper Function to Generate Unique 10-Digit Code ---
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

// --- Controller Functions ---

export const registerUser = asyncHandler(async (req, res) => {
  // 1. Get user data
  const {
    name,
    email,
    password,
    contact,
    areacode,
    address,
    status,
    code, // This is the optional code for admin/collector
  } = req.body;

  // 2. Validate required fields
  if (
    [name, email, password, contact, areacode, address].some((f) => !f?.trim())
  ) {
    throw new ApiError(400, "All required fields must be filled");
  }

  // 3. Check if user already exists (by email OR name)
  const existingUser = await User.findOne({ $or: [{ email }, { name }] });
  if (existingUser) {
    throw new ApiError(409, "User with this email or name already exists");
  }

  // 4. Determine user role
  let role = "citizen"; // Default role
  if (status && status.trim() !== "") {
    role = "organisation";
  } else if (code) {
    if (code === ADMIN_SECRET_CODE) {
      role = "admin";
    } else if (code === COLLECTOR_SECRET_CODE) {
      role = "collector";
    }
  }

  // 5. Generate the unique 10-digit user code
  const userCode = await generateUniqueUserCode();

  // 6. Create new user object
  const user = await User.create({
    code: userCode,
    name,
    email,
    password, // Password will be hashed by the 'pre-save' hook in the model
    contact,
    areacode,
    address,
    role,
    status: status || "",
  });

  // 7. Get the created user (without password)
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "Failed to register user");
  }

  // 8. Return successful response
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  // 1. Get login credentials
  const { loginIdentifier, password } = req.body; // 'loginIdentifier' can be email or name

  // 2. Validate
  if (!loginIdentifier || !password) {
    throw new ApiError(400, "Email/Name and password are required");
  }

  // 3. Find user by email OR name
  const user = await User.findOne({
    $or: [{ email: loginIdentifier }, { name: loginIdentifier }],
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // 4. Compare password
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // 5. Generate tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // 6. Send cookies and response
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
});

export const logoutUser = asyncHandler(async (req, res) => {
  // We would also clear the refreshToken from the DB here
  // await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined } });

  return res
    .status(200)
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .clearCookie("refreshToken", COOKIE_OPTIONS)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export const getMyProfile = asyncHandler(async (req, res) => {
  // `req.user` is already populated by the `isVerified` middleware
  return res
    .status(200)
    .json(
      new ApiResponse(200, req.user, "User profile fetched successfully")
    );
});
export const updateMyProfile = asyncHandler(async (req, res) => {
  // Added email, areacode, and status
  const { name, contact, address, status, email, areacode } = req.body;

  // Find user and update (only non-sensitive fields)
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        name,
        contact,
        address,
        status,
        email,    // Added email
        areacode, // Added areacode
      },
    },
    { new: true, runValidators: true } // Return the updated document and run schema validators
  ).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile updated successfully"));
});

// --- NEW CONTROLLER ---
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old password and new password are required");
  }

  // 1. Find the user from the verified request
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // 2. Compare the old password
  const isPasswordMatch = await user.comparePassword(oldPassword);
  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid old password");
  }

  // 3. Set and save the new password
  // (The pre-save hook in User.js will automatically hash it)
  user.password = newPassword;
  await user.save({ validateBeforeSave: false }); // Skip other validations

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});
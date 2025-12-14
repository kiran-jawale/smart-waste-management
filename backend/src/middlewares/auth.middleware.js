import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ACCESS_TOKEN_SECRET } from "../constants.js";

export const isVerified = asyncHandler(async (req, _, next) => {
  try {
    let token = req.cookies?.accessToken;
    if (!token) {
      const authHeader = req.header("Authorization");
      if (authHeader) {
        token = authHeader.replace("Bearer ", "");
      }
    }
    if (!token || typeof token !== "string") {
      throw new ApiError(401, "Unauthorised Request");
    }

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password");
    if (!user) throw new ApiError(401, "Invalid Access Token");

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMyProfile,
  updateMyProfile,
  changePassword
} from "../controllers/user.controller.js";
import { isVerified } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// --- Public Auth Routes ---
router.route("/register").post(
  upload.none(), // Use upload.none() if no file, or upload.single() for profile pic
  registerUser
);
router.route("/login").post(loginUser);

// --- Secured Routes ---
router.route("/logout").post(isVerified, logoutUser);
router.route("/me").get(isVerified, getMyProfile);
router.route("/update-profile").put(isVerified, updateMyProfile);

router.route("/change-password").post(isVerified, changePassword);

export default router;
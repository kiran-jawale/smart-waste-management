import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/admin.controller.js";
import { isVerified } from "../middlewares/auth.middleware.js";
import { isAdmin, isAdminOrCollector } from "../middlewares/role.middleware.js"; // Import new middleware

const router = Router();

// Apply auth check to all routes first
router.use(isVerified); 

// --- User Management Routes ---

// FIX: This route is now accessible by Admins AND Collectors
// This allows the <select> dropdown in ReportForm to load
router.route("/users").get(isAdminOrCollector, getAllUsers);

// These routes remain Admin-Only
//router.route("/users/create").post(isAdmin, createUser); // Changed path to avoid conflict

router
  .route("/users/:id")
  .get(isAdmin, getUserById)
  .put(isAdmin, updateUser)
  .delete(isAdmin, deleteUser);

export default router;
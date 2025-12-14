import { Router } from "express";
import {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
} from "../controllers/complaint.controller.js";
import { isVerified } from "../middlewares/auth.middleware.js";
import {
  isAdmin,
  isCitizenOrOrg,
  isAdminOrCollector,
} from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Apply verification to all routes in this file
router.use(isVerified);

// --- Citizen & Organisation Routes ---
router.route("/").post(
  isCitizenOrOrg,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  createComplaint
); // POST /api/v1/complaints
router.route("/my-complaints").get(isCitizenOrOrg, getMyComplaints); // GET /api/v1/complaints/my-complaints

// --- Collector & Admin Routes ---
router.route("/").get(isAdminOrCollector, getAllComplaints);

router
  .route("/:id")
  .put(isAdminOrCollector, updateComplaintStatus)
  .get(isAdminOrCollector, getComplaintById);

// --- Admin Only Route ---
router.route("/:id").delete(isAdmin, deleteComplaint); // DELETE /api/v1/complaints/:id

export default router;
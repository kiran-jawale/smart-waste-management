import { Router } from "express";
import {
  createReport,
  getMyReports,
  getAreaReports,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
  markAreaCollected
} from "../controllers/wasteReport.controller.js";
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

// --- Citizen & Organisation Routes (Read-Only) ---
router.route("/my-reports").get(isCitizenOrOrg, getMyReports); // GET /api/v1/reports/my-reports

// --- Collector & Admin Routes (Create/Update/Read) ---
router
  .route("/")
  .post(isAdminOrCollector, upload.single("image"), createReport); // POST /api/v1/reports

router.route("/area").get(isAdminOrCollector, getAreaReports); // GET /api/v1/reports/area

router
  .route("/:id")
  .put(isAdminOrCollector, updateReport) // PUT /api/v1/reports/:id
  .get(isAdminOrCollector, getReportById); // GET /api/v1/reports/:id

// --- Admin Only Routes (Full Access) ---
router.route("/").get(isAdminOrCollector, getAllReports); // GET /api/v1/reports
router.route("/:id").delete(isAdmin, deleteReport); // DELETE /api/v1/reports/:id

router.route("/mark-area").post(isAdminOrCollector, markAreaCollected);

export default router;
import { WasteReport } from "../models/wasteReport.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import fs from "fs";
import path from "path";

// --- Collector & Admin ---
export const createReport = asyncHandler(async (req, res) => {
  const { category, reason, areacode, sourceCode } = req.body;



  // In your new logic, an Admin/Collector creates the report.
  // We'll assume they provide the 'sourceCode' of the citizen/org.
  // If not, we'll use their own code as the source.
  const finalSourceCode = sourceCode || req.user.code;

  const report = await WasteReport.create({
    category,
    reason,
    areacode,
    sourceCode: finalSourceCode,
    imagePath: req.file?.path,
    status: "scheduled", // Default status
  });

  return res
    .status(201)
    .json(new ApiResponse(201, report, "Report created successfully"));
});

// --- Collector & Admin ---
export const updateReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, collectionTime, departureTime, category, reason } = req.body;

  const updateData = {};

  // Collectors can only update status and times
  if (req.user.role === "collector") {
    if (status) updateData.status = status;
    if (collectionTime) updateData.collectionTime = collectionTime;
    if (departureTime) updateData.departureTime = departureTime;
  }
  
  // Admins can update everything
  if (req.user.role === "admin") {
    if (status) updateData.status = status;
    if (collectionTime) updateData.collectionTime = collectionTime;
    if (departureTime) updateData.departureTime = departureTime;
    if (category) updateData.category = category;
    if (reason) updateData.reason = reason;
  }

  const updatedReport = await WasteReport.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );

  if (!updatedReport) {
    throw new ApiError(404, "Report not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedReport, "Report updated successfully"));
});

// --- Admin Only ---
export const deleteReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const report = await WasteReport.findById(id);

  if (!report) {
    throw new ApiError(404, "Report not found");
  }

  // Delete the associated image file
  try {
    const localPath = path.resolve(report.imagePath);
    fs.unlinkSync(localPath);
  } catch (error) {
    console.log("Error deleting report image:", error.message);
    // Don't block the request if file deletion fails
  }

  await WasteReport.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Report deleted successfully"));
});

// --- Citizen & Organisation ---
export const getMyReports = asyncHandler(async (req, res) => {
  // Finds reports where the 'sourceCode' matches the logged-in user's 'code'
  const reports = await WasteReport.find({ sourceCode: req.user.code });
  return res
    .status(200)
    .json(new ApiResponse(200, reports, "Your reports fetched successfully"));
});

// --- Collector & Admin ---
export const getAreaReports = asyncHandler(async (req, res) => {
  // Finds reports matching the logged-in collector/admin's areacode
  // Also allows filtering by status, e.g., /api/v1/reports/area?status=scheduled
  const filter = {
    areacode: req.user.areacode,
  };

  if (req.query.status) {
    filter.status = req.query.status;
  }

  const reports = await WasteReport.find(filter);
  return res
    .status(200)
    .json(
      new ApiResponse(200, reports, "Reports for your area fetched successfully")
    );
});

// --- Admin Only ---
export const getAllReports = asyncHandler(async (req, res) => {
  // Allows filtering by areacode or status
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.areacode) filter.areacode = req.query.areacode;

  const reports = await WasteReport.find(filter);
  return res
    .status(200)
    .json(new ApiResponse(200, reports, "All reports fetched successfully"));
});

// --- Collector & Admin ---
export const getReportById = asyncHandler(async (req, res) => {
  const report = await WasteReport.findById(req.params.id);
  if (!report) {
    throw new ApiError(404, "Report not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, report, "Report fetched successfully"));
});

// --- NEW CONTROLLER for Collector & Admin ---
export const markAreaCollected = asyncHandler(async (req, res) => {
  const { areacode, reason } = req.body;
  const collectorId = req.user._id; // The admin/collector marking it

  if (!areacode || !reason) {
    throw new ApiError(400, "Area code and reason are required.");
  }

  // This creates a new "master" report for the whole area
  const areaReport = await WasteReport.create({
    category: 'general', // General category for area-wide collection
    reason: reason,
    areacode: areacode,
    sourceCode: req.user.code, // Log which collector/admin did this
    status: 'collected', // Mark as collected immediately
    collectionTime: new Date(),
    // No imagePath is needed
  });

  // Optional: You could also find all "scheduled" reports for this areacode
  // and update them to "collected".
  // await WasteReport.updateMany(
  //   { areacode: areacode, status: 'scheduled' },
  //   { $set: { status: 'collected', collectionTime: new Date() } }
  // );

  return res
    .status(201)
    .json(new ApiResponse(201, areaReport, "Area marked as collected"));
});
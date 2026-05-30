import { WasteReport } from '../models/wasteReport.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { withMetrics } from '../utils/metrics.logger.js';
import CloudinaryService from '../utils/cloudinary.js';

export const createReport = asyncHandler(async (req, res) => {
  const { category, reason, areacode, sourceCode } = req.body;
  const finalSourceCode = sourceCode || req.user.code;

  let cloudinaryUrl = null;
  let cloudinaryPublicId = null;

  // Cloudinary Integration
  if (req.file?.path) {
    // Measure Cloudinary Upload Time
    const uploadResult = await withMetrics(
      "Cloudinary | Image Upload | Operation: createReport",
      () => CloudinaryService.upload(req.file.path)
    );

    if (!uploadResult) {
       throw new ApiError(500, "Failed to upload evidence image to cloud storage.");
    }
    
    cloudinaryUrl = uploadResult.secure_url;
    cloudinaryPublicId = uploadResult.public_id; // Store this so we can delete it later
  }

  // Measure Database Write Time
  const report = await withMetrics(
      "DB | Create Report | filter: none",
      () => WasteReport.create({
        category,
        reason,
        areacode,
        sourceCode: finalSourceCode,
        imagePath: cloudinaryUrl, // Store Cloud URL, not local path
        imagePublicId: cloudinaryPublicId, // Add this to your Mongoose Schema later
        status: 'scheduled', 
      })
  );

  return res.status(201).json(new ApiResponse(201, report, 'Report created successfully'));
});

// --- Collector & Admin ---
export const updateReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, collectionTime, departureTime, category, reason } = req.body;

  const updateData = {};

  if (req.user.role === 'collector') {
    if (status) updateData.status = status;
    if (collectionTime) updateData.collectionTime = collectionTime;
    if (departureTime) updateData.departureTime = departureTime;
  }

  if (req.user.role === 'admin') {
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
    throw new ApiError(404, 'Report not found');
  }

  return res.status(200).json(new ApiResponse(200, updatedReport, 'Report updated successfully'));
});

// --- Admin Only ---
export const deleteReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const report = await WasteReport.findById(id);

  if (!report) {
    throw new ApiError(404, 'Report not found');
  }

  // Delete from Cloudinary if it exists
  if (report.imagePublicId) {
    await withMetrics(
      "Cloudinary | Image Delete | Operation: deleteReport",
      () => CloudinaryService.delete(report.imagePublicId)
    );
  }

  await withMetrics(
      "DB | Delete Report | filter: byId",
      () => WasteReport.findByIdAndDelete(id)
  );

  return res.status(200).json(new ApiResponse(200, {}, 'Report deleted successfully'));
});

// --- Citizen & Organisation ---
export const getMyReports = asyncHandler(async (req, res) => {
  // Fixed Syntax: No 'await' inside the arrow function returning the query promise
  const reports = await withMetrics(
      "DB | Get own reports | filter: sourceCode",
      () => WasteReport.find({ sourceCode: req.user.code }) 
  );
  
  return res.status(200).json(new ApiResponse(200, reports, 'Your reports fetched successfully'));
});

// --- Collector & Admin ---
export const getAreaReports = asyncHandler(async (req, res) => {
  const filter = { areacode: req.user.areacode };
  if (req.query.status) {
    filter.status = req.query.status;
  }

  const reports = await withMetrics(
      "DB | Get area reports | Admin/Mod | filter: areacode, status",
      () => WasteReport.find(filter) 
  );

  return res.status(200).json(new ApiResponse(200, reports, 'Reports for your area fetched successfully'));
});

// --- Admin Only ---
export const getAllReports = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.areacode) filter.areacode = req.query.areacode;

  const reports = await withMetrics(
      "DB | Get all reports | Admin | filter: status, areacode",
      () => WasteReport.find(filter) 
  );

  return res.status(200).json(new ApiResponse(200, reports, 'All reports fetched successfully'));
});

export const getReportById = asyncHandler(async (req, res) => {
  const report = await withMetrics(
      "DB | Get report by ID | filter: byId",
      () => WasteReport.findById(req.params.id)
  );

  if (!report) {
    throw new ApiError(404, 'Report not found');
  }
  return res.status(200).json(new ApiResponse(200, report, 'Report fetched successfully'));
});

// --- NEW CONTROLLER for Collector & Admin ---
export const markAreaCollected = asyncHandler(async (req, res) => {
  const { areacode, reason } = req.body;

  if (!areacode || !reason) {
    throw new ApiError(400, 'Area code and reason are required.');
  }

  const areaReport = await withMetrics(
      "DB | Create Area Report | filter: none",
      () => WasteReport.create({
        category: 'general',
        reason: reason,
        areacode: areacode,
        sourceCode: req.user.code, 
        status: 'collected',
        collectionTime: new Date(),
      })
  );

  return res.status(201).json(new ApiResponse(201, areaReport, 'Area marked as collected'));
});
import { Complaint } from "../models/complaint.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import fs from "fs";
import path from "path";

// --- Citizen & Organisation ---
export const createComplaint = asyncHandler(async (req, res) => {
  const { subject, description, address } = req.body;

  if (!req.files || !req.files.image1) {
    throw new ApiError(400, "At least one image (image1) is required");
  }

  const complaint = await Complaint.create({
    subject,
    description,
    address,
    complaineeId: req.user._id, // Attach the logged-in user's ID
    image1: req.files.image1[0].path,
    image2: req.files.image2 ? req.files.image2[0].path : undefined,
    image3: req.files.image3 ? req.files.image3[0].path : undefined,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, complaint, "Complaint created successfully"));
});

// --- Collector & Admin ---
export const updateComplaintStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!["pending", "resolved", "in-progress"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const updatedComplaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    { status: status },
    { new: true }
  );

  if (!updatedComplaint) {
    throw new ApiError(404, "Complaint not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComplaint, "Complaint status updated"));
});

// --- Admin Only ---
export const deleteComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    throw new ApiError(404, "Complaint not found");
  }

  // Delete associated images
  const images = [complaint.image1, complaint.image2, complaint.image3];
  images.forEach((imgPath) => {
    if (imgPath) {
      try {
        const localPath = path.resolve(imgPath);
        fs.unlinkSync(localPath);
      } catch (error) {
        console.log("Error deleting complaint image:", error.message);
      }
    }
  });

  await Complaint.findByIdAndDelete(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Complaint deleted successfully"));
});

// --- Citizen & Organisation ---
export const getMyComplaints = asyncHandler(async (req, res) => {
  // Finds complaints where 'complaineeId' matches the logged-in user's ID
  const complaints = await Complaint.find({ complaineeId: req.user._id });
  return res
    .status(200)
    .json(
      new ApiResponse(200, complaints, "Your complaints fetched successfully")
    );
});

// --- Collector & Admin ---
export const getAllComplaints = asyncHandler(async (req, res) => {
  // Allows filtering by status, e.g., /api/v1/complaints?status=pending
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const complaints = await Complaint.find(filter);
  return res
    .status(200)
    .json(new ApiResponse(200, complaints, "All complaints fetched successfully"));
});

// --- Collector & Admin ---
export const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    throw new ApiError(44, "Complaint not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, complaint, "Complaint fetched successfully"));
});
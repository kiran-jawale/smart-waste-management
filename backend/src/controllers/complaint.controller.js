import { Complaint } from "../models/complaint.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { withMetrics } from "../utils/metrics.logger.js";
import CloudinaryService from "../utils/cloudinary.js";

// --- Citizen & Organisation ---
export const createComplaint = asyncHandler(async (req, res) => {
  const { subject, description, address } = req.body;

  if (!req.files || !req.files.image1) {
    throw new ApiError(400, "At least one image (image1) is required");
  }

  let img1Data, img2Data, img3Data;

  // Upload image 1 (Required)
  const up1 = await withMetrics(
    "Cloudinary | Upload Image 1 | Operation: createComplaint",
    () => CloudinaryService.upload(req.files.image1[0].path, "complaints")
  );
  if (up1) img1Data = { url: up1.secure_url, id: up1.public_id };

  // Upload image 2 (Optional)
  if (req.files.image2) {
    const up2 = await withMetrics(
      "Cloudinary | Upload Image 2 | Operation: createComplaint",
      () => CloudinaryService.upload(req.files.image2[0].path, "complaints")
    );
    if (up2) img2Data = { url: up2.secure_url, id: up2.public_id };
  }

  // Upload image 3 (Optional)
  if (req.files.image3) {
    const up3 = await withMetrics(
      "Cloudinary | Upload Image 3 | Operation: createComplaint",
      () => CloudinaryService.upload(req.files.image3[0].path, "complaints")
    );
    if (up3) img3Data = { url: up3.secure_url, id: up3.public_id };
  }

  const complaint = await withMetrics(
      "DB | Create Complaint | filter: none",
      () => Complaint.create({
        subject,
        description,
        address,
        complaineeId: req.user._id,
        image1: img1Data?.url,
        image1PublicId: img1Data?.id,
        image2: img2Data?.url,
        image2PublicId: img2Data?.id,
        image3: img3Data?.url,
        image3PublicId: img3Data?.id,
      })
  );

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

  const updatedComplaint = await withMetrics(
      "DB | Update Complaint Status | filter: byId",
      () => Complaint.findByIdAndUpdate(
        req.params.id,
        { status: status },
        { new: true }
      )
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

  // Delete associated images from Cloudinary
  const publicIds = [complaint.image1PublicId, complaint.image2PublicId, complaint.image3PublicId];
  
  for (const id of publicIds) {
    if (id) {
       await withMetrics(
          "Cloudinary | Delete Image | Operation: deleteComplaint",
          () => CloudinaryService.delete(id)
       );
    }
  }

  await withMetrics(
      "DB | Delete Complaint | filter: byId",
      () => Complaint.findByIdAndDelete(req.params.id)
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Complaint deleted successfully"));
});

// --- Citizen & Organisation ---
export const getMyComplaints = asyncHandler(async (req, res) => {
  const complaints = await withMetrics(
      "DB | Get Own Complaints | filter: complaineeId",
      () => Complaint.find({ complaineeId: req.user._id })
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, complaints, "Your complaints fetched successfully")
    );
});

// --- Collector & Admin ---
export const getAllComplaints = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const complaints = await withMetrics(
      "DB | Get all complaints | Admin/Mod | filter: status",
      () => Complaint.find(filter)
  );

  return res
    .status(200)
    .json(new ApiResponse(200, complaints, "All complaints fetched successfully"));
});

 
export const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await withMetrics(
      "DB | Get complaint by ID | filter: byId",
      () => Complaint.findById(req.params.id)
  );

  if (!complaint) {
    throw new ApiError(404, "Complaint not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, complaint, "Complaint fetched successfully"));
});
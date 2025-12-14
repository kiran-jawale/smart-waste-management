import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CORS_ORIGIN } from "./constants.js";

const app = express();

// --- Middleware ---
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // For images/uploads
app.use(cookieParser());

// --- Routes ---
// Import routers
import userRouter from './routes/user.route.js';
import reportRouter from './routes/wasteReport.route.js';
import complaintRouter from './routes/complaint.route.js';
import adminRouter from './routes/admin.route.js';
import seedRouter from './routes/seed.route.js'; // <-- 1. Import the new router

// Route declarations
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reports', reportRouter);
app.use('/api/v1/complaints', complaintRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/seed', seedRouter); // <-- 2. Use the new router

export { app };
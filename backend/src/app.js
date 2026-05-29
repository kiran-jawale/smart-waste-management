import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CORS_ORIGIN } from "./constants.js";
import dotenv from 'dotenv';
import path from 'path'
import {fileURLToPath} from 'url'

// Configure environment variables first
dotenv.config({
  path: './.env',
});

// --- ES Module Fix for __dirname ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// --- Serve Frontend (Vite Build) ---
// 1. Tell Express to serve the static files from the 'dist' folder
app.use(express.static(path.join(__dirname, "dist")));

// 2. The Catch-All Route for React Router
// This MUST be the absolute last route in your file.
// If a user requests a route that isn't an API route, send them the React app.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

export { app };
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { CORS_ORIGIN } from './constants.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan'
import { morganStream } from './utils/metrics.logger.js';

dotenv.config({
  path: './.env',
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(morgan(
  ':method :url | Status: :status | Size: :res[content-length] bytes | Time: :response-time ms | Date: :date[iso]',
  { stream: morganStream }
));

import userRouter from './routes/user.route.js';
import reportRouter from './routes/wasteReport.route.js';
import complaintRouter from './routes/complaint.route.js';
import adminRouter from './routes/admin.route.js';
import seedRouter from './routes/seed.route.js';
import insightsRouter from './routes/insights.route.js';

app.use('/api/v2/users', userRouter);
app.use('/api/v2/reports', reportRouter);
app.use('/api/v2/complaints', complaintRouter);
app.use('/api/v2/admin', adminRouter);
app.use('/api/v2/seed', seedRouter);
app.use('/api/v2/insights', insightsRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  console.error(`[🚨 GLOBAL ERROR] ${statusCode} - ${message}`);
  if (process.env.NODE_ENV !== 'production') console.error(err.stack);

  res.status(statusCode).json({
    success: false,
    message: message,
    errors: err.errors || [],
  });
});

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

export { app };

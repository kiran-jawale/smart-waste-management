import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { CORS_ORIGIN } from './constants.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

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
app.use(morgan(':method :url :status :res[content-length] bytes - :response-time ms'));

import userRouter from './routes/user.route.js';
import reportRouter from './routes/wasteReport.route.js';
import complaintRouter from './routes/complaint.route.js';
import adminRouter from './routes/admin.route.js';
import seedRouter from './routes/seed.route.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/reports', reportRouter);
app.use('/api/v1/complaints', complaintRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/seed', seedRouter);

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

export { app };

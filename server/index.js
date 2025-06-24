import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import cors from 'cors';
import courseRoute from './routes/course.route.js';
import mediaRoute from './routes/media.route.js';
import purchaseRoute from './routes/purchaseCourse.route.js';
import { stripeWebhook } from './controllers/coursePurchase.controller.js';
import courseProgressRoute from './routes/courseProgress.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Stripe webhook needs raw body
app.post("/api/v1/purchase/webhook", bodyParser.raw({ type: "application/json" }), stripeWebhook);

// 🟩 Normal middleware (after webhook raw)
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// ✅ API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/course-progress", courseProgressRoute);

// ✅ Serve frontend
const distPath = path.join(__dirname, '..', 'client', 'dist');

app.use(express.static(distPath));

// Serve root
app.get('/', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ✅ List all frontend routes (static + dynamic handled with regex)
const staticRoutes = [
  '/login',
  '/my-learning',
  '/profile',
  '/course/search',
  '/admin',
  '/admin/dashboard',
  '/admin/course',
  '/admin/course/create'
];

// Register static routes
staticRoutes.forEach(route => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
});

// Dynamic routes using regex (no path-to-regexp involved)
app.get(/^\/my-learning\/course-details\/[^/]+$/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});
app.get(/^\/course-details\/[^/]+$/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});
app.get(/^\/course-progress\/[^/]+$/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});
app.get(/^\/admin\/course\/[^/]+$/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});
app.get(/^\/admin\/course\/[^/]+\/lecture$/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});
app.get(/^\/admin\/course\/[^/]+\/lecture\/[^/]+$/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Stripe webhook needs raw body
app.post("/api/v1/purchase/webhook", bodyParser.raw({ type: "application/json" }), stripeWebhook);

// 🟩 Normal middleware (comes after webhook raw)
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// ✅ All other routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/course-progress", courseProgressRoute);

// ✅ Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

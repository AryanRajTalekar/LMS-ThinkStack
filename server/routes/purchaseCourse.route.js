import express from 'express';
import { createCheckoutSession, getAllPurchasedCourses, getCourseDetailWithPurchaseStatus, stripeWebhook } from '../controllers/coursePurchase.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

// Important: raw body for webhook
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

// Other routes
router.post("/checkout/create-checkout-session", isAuthenticated, createCheckoutSession);


router.get("/course/:courseId/detail-with-status", isAuthenticated, getCourseDetailWithPurchaseStatus);

router.route("/").get(isAuthenticated,getAllPurchasedCourses);



export default router;

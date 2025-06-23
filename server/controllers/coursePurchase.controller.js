import Stripe from "stripe";
import dotenv from "dotenv";
import { Course } from "../models/course.model.js";
import { coursePurchase } from "../models/purchashedCourses.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course Not Found!" });

    const newPurchase = new coursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/course-details/${courseId}`,
      cancel_url: `${process.env.FRONTEND_URL}/course-details/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
    });

    if (!session.url) {
      return res.status(400).json({
        success: false,
        message: "Error while creating session",
      });
    }

    newPurchase.paymentId = session.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("❌ Error creating checkout session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const stripeWebhook = async (req, res) => {
  let event; // ✅ Important: Declare event

  const sig = req.headers["stripe-signature"];
  const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, secret);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object;

      const purchase = await coursePurchase
        .findOne({ paymentId: session.id })
        .populate("courseId");

      if (!purchase) {
        console.log("❌ Purchase not found");
        return res.status(404).json({ message: "Purchase not found" });
      }

      purchase.status = "completed";
      purchase.amount = session.amount_total / 100;

      // Unlock lectures
      if (purchase.courseId?.lectures?.length) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();

      // Update user's enrolledCourses
      await User.findByIdAndUpdate(purchase.userId, {
        $addToSet: { enrolledCourses: purchase.courseId._id },
      });

      // Update course's enrolledStudents
      await Course.findByIdAndUpdate(purchase.courseId._id, {
        $addToSet: { enrolledStudents: purchase.userId },
      });

      console.log("✅ Purchase processed and updated successfully");
    } catch (error) {
      console.error("❌ Error processing webhook:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.status(200).send(); // Always return 200 to Stripe
};

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

      const purchased = await coursePurchase.findOne({userId,courseId});

      if(!course){
        return res.status(404).json({
          message:"Course Not Found"
        })
      }

      return res.status(200).json({
        course,
        purchased: purchased ? true : false
      });
  } catch (error) {
    console.error(" Error fetching course details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getAllPurchasedCourses = async (_, res) => {
  try {
    const purchasedCourse = await coursePurchase.find({status:"completed"}).populate("courseId");
    if(!purchasedCourse || purchasedCourse.length === 0) {
      return res.status(404).json({ message: "No purchased courses found" });
    }
    return res.status(200).json({
      purchasedCourse
    })
  } catch (error) {
    console.error("❌ Error fetching purchased courses:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

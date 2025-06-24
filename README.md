# 📚 ThinkStack LMS

ThinkStack is a full-stack Learning Management System (LMS) platform where users can create, manage, and enroll in online courses. It supports features like authentication, course creation, lecture management, media uploads, and Stripe payment integration.



## 🚀 Live Demo

🌐 [Visit ThinkStack](https://lms-thinkstack-1.onrender.com)

---

## 🧰 Tech Stack

**Frontend:**
- React.js + Vite
- Tailwind CSS
- Redux Toolkit
- TipTap (Rich Text Editor)
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- Cloudinary (Media storage)
- Stripe (Payment integration)
- JWT (Authentication)

---

## 🧑‍💻 Features

- 🔐 User Registration & Login (JWT-based Auth)
- 📘 Create & Edit Courses and Lectures
- 🎥 Upload Videos to Cloudinary
- 💳 Secure Stripe Checkout Integration
- 🧾 Dynamic Course Progress Tracking
- 🧑‍🏫 Admin Panel for Course Management
- 🌗 Dark Mode Ready

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following:

```env
PORT=8080
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUD_NAME=your_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable

# App URLs
FRONTEND_URL=https://lms-thinkstack-1.onrender.com
WEBHOOK_ENDPOINT_SECRET=your_stripe_webhook_secret


📦 Installation

# Clone the repository
git clone https://github.com/your-username/thinkstack-lms.git
cd thinkstack-lms

# Install server dependencies
npm install

# Install client dependencies
npm install --prefix client

# Build frontend
npm run build --prefix client

# Run server
npm start


📁 Folder Structure

/client          → Frontend (React + Vite)
/server          → Backend (Express + MongoDB)
.env             → Environment config


🛠 Deployment

The app is deployed using Render:

Client and server are served from a single URL.

Cloudinary is configured with secure: true to avoid mixed content issues.

Stripe uses https URLs for success/cancel redirects.

✅ To-Do / Future Features

🟡 User certificates after course completion


📸 Screenshots
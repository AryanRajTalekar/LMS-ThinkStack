import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider.jsx";

// Layouts & UI
import MainLayout from "./layout/MainLayout.jsx";
import Navbar from "./utils/Navbar.jsx";
import Footer from "./utils/Footer.jsx";

// Pages (Student)
import Login from "./pages/Login.jsx";
import HeroSection from "./pages/Student/HeroSection.jsx";
import Courses from "./pages/Student/Courses.jsx";
import MyLearning from "./pages/Student/MyLearning.jsx";
import Profile from "./pages/Student/Profile.jsx";
import CourseDetail from "./pages/Student/CourseDetail.jsx";
import CourseProgress from "./pages/Student/CourseProgress.jsx";
import SearchPage from "./pages/Student/SearchPage.jsx";

// Pages (Admin)
import SideBar from "./pages/Admin/SideBar.jsx";
import CourseTable from "./pages/Admin/Course/CourseTable.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AddCourse from "./pages/Admin/Course/AddCourse.jsx";
import UpdateCourse from "./pages/Admin/Course/UpdateCourse.jsx";
import CreateLecture from "./pages/Admin/Lecture/CreateLecture.jsx";
import UpdateLecture from "./pages/Admin/Lecture/UpdateLecture.jsx";

// Components
import About from "./utils/About.jsx";
import ThinkStackIntro from "./utils/ThinkStackIntro.jsx";
import CallToAction from "./utils/CallToAction.jsx";

// Route Guards
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./utils/ProtectedRoutes.jsx";
import PurchaseCourseProtectedRoute from "./utils/PurchaseCourseProtectedRoute.jsx";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <>
              <HeroSection />
              <Courses />
              <ThinkStackIntro />
              <CallToAction />
              <About />
              <Footer />
            </>
          ),
        },
        {
          path: "login",
          element: (
            <AuthenticatedUser>
              <Login />
            </AuthenticatedUser>
          ),
        },
        {
          path: "my-learning",
          element: (
            <ProtectedRoute>
              <MyLearning />
            </ProtectedRoute>
          ),
        },
        {
          path: "my-learning/course-details/:courseId",
          element: <CourseDetail />,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "course/search",
          element: (
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "course-details/:courseId",
          element: (
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          ),
        },
        {
          path: "course-progress/:courseId",
          element: (
            <ProtectedRoute>
              <PurchaseCourseProtectedRoute>
                <CourseProgress />
              </PurchaseCourseProtectedRoute>
            </ProtectedRoute>
          ),
        },

        // Admin Routes
        {
          path: "admin",
          element: (
            <AdminRoute>
              <SideBar />
            </AdminRoute>
          ),
          children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "course", element: <CourseTable /> },
            { path: "course/create", element: <AddCourse /> },
            { path: "course/:courseId", element: <UpdateCourse /> },
            { path: "course/:courseId/lecture", element: <CreateLecture /> },
            { path: "course/:courseId/lecture/:lectureId", element: <UpdateLecture /> },
          ],
        },
      ],
    },
  ]);

  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;

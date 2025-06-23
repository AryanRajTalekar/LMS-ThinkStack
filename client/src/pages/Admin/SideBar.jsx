import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full lg:w-[250px] sm:w-[300px] bg-[#f0f0f0] dark:bg-[#111111] border-b lg:border-b-0 lg:border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 z-10">
        <div className="space-y-6">
          <Link
            to="dashboard"
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              location.pathname.includes("dashboard")
                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <ChartNoAxesColumn size={22} />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>

          <Link
            to="course"
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              location.pathname.includes("course")
                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <SquareLibrary size={22} />
            <span className="text-sm font-medium">Courses</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 sm:p-8 md:p-10 bg-white dark:bg-[#141414]">
        <Outlet />
      </main>
    </div>
  );
};

export default SideBar;

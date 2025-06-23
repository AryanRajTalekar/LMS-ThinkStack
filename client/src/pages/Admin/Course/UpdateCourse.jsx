import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const UpdateCourse = () => {
  return (
    <section className="bg-white dark:bg-[#111111] min-h-screen px-4 sm:px-6 md:px-10 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-bold text-2xl text-gray-900 dark:text-white">
          Add Details Of Your Course
        </h1>
        <Link to="lecture">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Go To Lectures Page
          </Button>
        </Link>
      </div>

      <CourseTab />
    </section>
  );
};

export default UpdateCourse;

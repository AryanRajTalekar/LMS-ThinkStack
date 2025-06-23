import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Course from "./Course";
import { useGetPublishedCoursesQuery } from "@/features/api/courseApi";

const Courses = () => {
  const { data, isLoading, isSuccess, isError } = useGetPublishedCoursesQuery();

  if (isError)
    return (
      <section className="text-center py-20 bg-white dark:bg-[#111111]">
        <h1 className="text-red-600 font-semibold text-lg">
          ⚠️ Some error occurred while fetching courses.
        </h1>
      </section>
    );

  return (
    <section className="bg-white dark:bg-[#111111] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
          Explore Our Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses?.map((course, index) => (
                <Course key={course._id || index} course={course} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-gray-100 dark:bg-[#1c1c1c] shadow-sm dark:shadow-md rounded-xl overflow-hidden hover:shadow-lg dark:hover:shadow-purple-700/20 transition-transform hover:scale-[1.02] duration-200">
      <Skeleton className="w-full h-40" />
      <div className="p-5 space-y-4">
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="w-24 h-4 rounded-md" />
          </div>
          <Skeleton className="w-16 h-4 rounded-md" />
        </div>
        <Skeleton className="w-1/3 h-4 rounded-md" />
      </div>
    </div>
  );
};

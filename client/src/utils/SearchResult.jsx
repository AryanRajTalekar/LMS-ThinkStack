import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-gray-300 dark:border-gray-700 py-6 gap-4">
      <Link
        to={`/course-details/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full"
      >
        <img
          src={course.courseThumbnail}
          alt="course-thumbnail"
          className="h-32 w-full md:w-56 object-cover rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl text-gray-900 dark:text-white">
            {course.courseTitle}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {course.subTitle}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Instructor:{" "}
            <span className="font-bold">{course.creator?.name}</span>
          </p>
          <Badge className="w-fit mt-2">{course.courseLevel}</Badge>
        </div>
      </Link>
      <div className="mt-2 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl text-blue-600 dark:text-blue-400">
          ₹{course.coursePrice}
        </h1>
      </div>
    </div>
  );
};

export default SearchResult;

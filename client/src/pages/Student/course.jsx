import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <Link to={`course-details/${course._id}`} className="block h-full">
      <Card className="flex flex-col h-full rounded-xl shadow-md dark:bg-[#1e1e1e] bg-white transition-transform hover:scale-[1.02] duration-300">
        {/* Thumbnail */}
        <div className="relative">
          <img
            className="w-full h-48 object-cover rounded-t-xl"
            src={course.courseThumbnail}
            alt={course.courseTitle || "Course Thumbnail"}
          />
        </div>

        {/* Content */}
        <CardContent className="flex flex-col flex-grow p-4 sm:p-5 space-y-4 justify-between">
          {/* Title */}
          <h1 className="font-semibold text-lg sm:text-xl text-gray-800 dark:text-white line-clamp-2 hover:underline">
            {course.courseTitle}
          </h1>

          {/* Instructor + Level */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={course.creator?.photoUrl || "https://github.com/shadcn.png"}
                  alt="Creator Avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[100px]">
                {course.creator?.name}
              </span>
            </div>

            <Badge className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
              {course.courseLevel}
            </Badge>
          </div>

          {/* Price */}
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-auto">
            ₹{course.coursePrice}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;

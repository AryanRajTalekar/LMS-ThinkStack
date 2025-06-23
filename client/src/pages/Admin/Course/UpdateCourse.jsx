import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const UpdateCourse = () => {
  return (
    <div className="flex-1">
      <div className="flex items-center mb-5 justify-between">
        <h1 className="font-bold text-xl">Add Details Of Your Course</h1>
        <Link to='lecture'>
          <Button>Go To Lectures Page</Button>
        </Link>
      </div>
      <CourseTab/>
    </div>
  );
};

export default UpdateCourse;

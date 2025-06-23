import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Course from "./course";
import { useGetPublishedCoursesQuery } from "@/features/api/courseApi";




const Courses = () => {
  const {data,isLoading,isSuccess,isError}  = useGetPublishedCoursesQuery();

    if(isError) return <h1>Some Error Occurred While Fetching Courses</h1>




  return (
    <div className="bg-gray-50 	dark:bg-[#232323]">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-4xl text-center mb-10 flex gap-2 items-center justify-center">Our Courses</h2>

        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6 ">
           {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <CourseSkeleton key={index} />
          ))
        ) : (
          data?.courses && data.courses.map((course,index)=><Course key={index} course={course}/>)
        )}
        </div>
       
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="w-20 h-4" />
          </div>
          <Skeleton className="w-16 h-4" />
        </div>
        <Skeleton className="w-1/4 h-4" />
      </div>
    </div>
  );
};

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Button } from "@/components/ui/button";
import BuyCourseButton from "@/utils/BuyCourseButton";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import ReactPlayer from "react-player";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1 className="text-center mt-10 text-lg">Loading...</h1>;
  if (isError || !data) return <h1 className="text-center mt-10 text-red-500">Error: {error?.message || "Something went wrong"}</h1>;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) navigate(`/course-progress/${courseId}`);
  };

  return (
    <div className="mt-24 space-y-10">
      {/* Header */}
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 space-y-2">
          <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
          <p className="text-base md:text-lg">{course.courseSubtitle}</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator?.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last Updated {course?.updatedAt.split("T")[0]}</p>
          </div>
          <p className="text-sm">Students Enrolled: {course?.enrolledStudents.length}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div>
            <h2 className="font-bold text-xl md:text-2xl mb-2">Description</h2>
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: course?.description || "<p>No description available.</p>",
              }}
            />
          </div>

          {/* Lectures */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Course Content</CardTitle>
              <CardDescription className="text-base">Lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course?.lectures.map((lecture, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <span>{purchased ? <PlayCircle size={16} /> : <Lock size={16} />}</span>
                  <p className="font-semibold">{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Section */}
        <div>
          <Card className="shadow-lg">
            <CardContent className="p-4 flex flex-col">
              {/* Video */}
              <div className="aspect-video w-full mb-4 rounded overflow-hidden">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={course.lectures[0].videoUrl}
                  controls={true}
                  preload="metadata"
                />
              </div>

              {/* Price and Button */}
              <h1 className="font-semibold text-lg mb-2">{course.lectures[0]?.lectureTitle || "Preview"}</h1>
              <Separator className="my-2" />
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                ₹{course?.coursePrice || 0}
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

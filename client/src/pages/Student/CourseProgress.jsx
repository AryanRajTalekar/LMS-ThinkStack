import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompletedCourseMutation,
  useGetCourseProgressQuery,
  useInCompletedCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess }] =
    useCompletedCourseMutation();
  const [inCompleteCourse, { data: markInCompleteData, isSuccess: inCompletedSuccess }] =
    useInCompletedCourseMutation();

  useEffect(() => {
    if (completedSuccess) {
      toast.success(markCompleteData.message);
      refetch();
    }
    if (inCompletedSuccess) {
      toast.success(markInCompleteData.message);
      refetch();
    }
  }, [completedSuccess, inCompletedSuccess]);

  const [currentLecture, setCurrentLecture] = useState(null);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load course details</p>;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  const initialLecture = currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) =>
    progress.some((p) => p.lectureId === lectureId && p.viewed);

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => await completeCourse(courseId);
  const handleInCompleteCourse = async () => await inCompleteCourse(courseId);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 mt-24 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "default" : "outline"}
        >
          {completed ? (
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Completed
            </span>
          ) : (
            "Mark as Completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Section */}
        <div className="flex-1 md:w-3/5 rounded-lg shadow-md dark:shadow-gray-700 p-4 bg-white dark:bg-[#1f1f1f]">
          <div className="aspect-video w-full rounded overflow-hidden mb-4">
            <video
              src={currentLecture?.videoUrl || initialLecture?.videoUrl || ""}
              controls
              className="w-full h-full"
              onPlay={() =>
                handleLectureProgress(currentLecture?._id || initialLecture?._id)
              }
            />
          </div>
          <h3 className="text-lg font-semibold">
            {`Lecture ${
              courseDetails.lectures.findIndex(
                (lec) => lec._id === (currentLecture?._id || initialLecture?._id)
              ) + 1
            } : ${currentLecture?.lectureTitle || initialLecture?.lectureTitle}`}
          </h3>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-2/5">
          <h2 className="text-xl font-semibold mb-4">Course Lectures</h2>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {courseDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                onClick={() => handleSelectLecture(lecture)}
                className={`cursor-pointer hover:shadow-lg transition rounded-lg ${
                  lecture._id === (currentLecture?._id || initialLecture?._id)
                    ? "bg-gray-100 dark:bg-gray-800"
                    : ""
                }`}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={20} className="text-green-500" />
                    ) : (
                      <CirclePlay size={20} className="text-gray-400" />
                    )}
                    <CardTitle className="text-base">{lecture.lectureTitle}</CardTitle>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-600 border-none"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;

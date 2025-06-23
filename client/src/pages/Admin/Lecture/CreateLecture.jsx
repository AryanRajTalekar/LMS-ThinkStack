import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  const [createLecture, { data, error, isLoading, isSuccess }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    if (!lectureTitle.trim()) {
      return toast.error("Lecture title cannot be empty");
    }

    try {
      await createLecture({ lectureTitle, courseId });
    } catch (error) {
      console.error("Create Lecture Error:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data?.message || "Lecture added successfully");
      setLectureTitle("");
    }

    if (error) {
      toast.error(error?.message || "Failed to add lecture");
    }
  }, [isSuccess, error]);

  return (
    <section className="bg-white dark:bg-[#111111] min-h-screen px-4 sm:px-6 md:px-10 py-10">
      <div className="mb-6">
        <h1 className="font-bold text-2xl text-gray-900 dark:text-white">
          Let's Add Lectures To Your Course
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          You can create multiple lectures for this course from here.
        </p>
      </div>

      <div className="space-y-8">
        {/* Input field */}
        <div className="space-y-2">
          <Label
            htmlFor="lecture-title"
            className="text-gray-800 dark:text-white"
          >
            Lecture Title
          </Label>
          <Input
            id="lecture-title"
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            name="lectureTitle"
            placeholder="Enter your lecture title"
            className="bg-white dark:bg-[#1c1c1c] border dark:border-gray-700"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back To Course
          </Button>

          <Button
            disabled={isLoading}
            onClick={createLectureHandler}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>

        {/* Lecture List */}
        <div className="mt-10 space-y-4">
          {lectureLoading ? (
            <p className="text-gray-700 dark:text-gray-300">Loading lectures...</p>
          ) : lectureError ? (
            <p className="text-red-500">Failed to load lectures.</p>
          ) : lectureData?.lectures?.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No lectures available yet.
            </p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
              <Lecture
                key={lecture._id || index}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CreateLecture;

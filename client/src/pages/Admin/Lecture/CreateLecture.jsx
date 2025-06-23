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
      toast.success(data.message);
      setLectureTitle("");
    }

    if (error) {
      toast.error(error.message);
    }
  }, [isSuccess, error]);

  


  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch
  } = useGetCourseLectureQuery(courseId);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Lets Add Lectures To Your Course</h1>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae,
          eligendi!
        </p>
      </div>

      <div className="space-y-8">
        <div className="mt-4 flex flex-col gap-4">
          <Label htmlFor="course-title">Lecture Title</Label>
          <Input
            id="course-title"
            type="text"
            value={lectureTitle}
            onChange={(e) => {
              setLectureTitle(e.target.value);
            }}
            name="lectureTitle"
            placeholder="Enter your Lecture Title"
          />
        </div>

        <div className="flex items-center gap-8 mt-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back To Course
          </Button>

          <Button disabled={isLoading} onClick={createLectureHandler}>
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
        <div className="mt-10">
          {lectureLoading ? (
            <>
              <p>Loading....</p>
            </>
          ) : lectureError ? (
            <p>Failed to Load Lectures.</p>
          ) : lectureData.lectures.length === 0 ? (
            <p>No Lectures Available</p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
              <Lecture key={lecture._id || index} lecture={lecture} courseId={courseId} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;

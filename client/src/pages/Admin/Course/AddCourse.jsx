import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setcourseTitle] = useState("");
  const [category, setcategory] = useState("");

  const [createCourse, { data, error, isSuccess, isLoading }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setcategory(value);
  };

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course Created Successfully");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);

  return (
    <section className="bg-white dark:bg-[#111111] py-16 px-4 sm:px-6 md:px-8 min-h-[calc(100vh-100px)]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="font-extrabold text-3xl md:text-4xl text-gray-900 dark:text-white mb-2">
            Create a New Course
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter the course title and select an appropriate category to begin
            creating your course.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Course Title */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="course-title" className="text-gray-800 dark:text-white">
              Course Title
            </Label>
            <Input
              id="course-title"
              type="text"
              value={courseTitle}
              onChange={(e) => setcourseTitle(e.target.value)}
              name="CourseTitle"
              placeholder="Enter your course title"
              className="bg-white dark:bg-[#1c1c1c] border border-gray-300 dark:border-gray-700"
            />
          </div>

          {/* Course Category */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="course-category" className="text-gray-800 dark:text-white">
              Course Category
            </Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-full max-w-sm bg-white dark:bg-[#1c1c1c] border border-gray-300 dark:border-gray-700">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Technical Domains</SelectLabel>
                  <SelectItem value="web-development">Web Development</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="machine-learning">Machine Learning</SelectItem>
                  <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
                  <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                  <SelectItem value="blockchain">Blockchain</SelectItem>
                  <SelectItem value="mobile-development">Mobile App Development</SelectItem>
                  <SelectItem value="game-development">Game Development</SelectItem>
                  <SelectItem value="ai">Artificial Intelligence</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/course")}
              className="rounded-md"
            >
              Back
            </Button>
            <Button
              disabled={isLoading}
              onClick={createCourseHandler}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-md"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddCourse;

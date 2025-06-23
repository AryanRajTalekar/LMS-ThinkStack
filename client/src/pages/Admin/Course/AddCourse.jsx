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
import { Loader, Loader2 } from "lucide-react";
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

  //for displaying toast

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course Created Successfully");
      navigate('/admin/course');
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Create a New Course</h1>
        <p className="text-sm text-muted-foreground">
          Enter the course title and select an appropriate category to begin
          creating your course.
        </p>
      </div>

      <div className="space-y-8">
        <div className="mt-4 flex flex-col gap-4">
          <Label htmlFor="course-title">Course Title</Label>
          <Input
            id="course-title"
            type="text"
            value={courseTitle}
            onChange={(e) => {
              setcourseTitle(e.target.value);
            }}
            name="CourseTitle"
            placeholder="Enter your course title"
          />
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <Label htmlFor="course-category">Course Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Technical Domains</SelectLabel>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="machine-learning">
                  Machine Learning
                </SelectItem>
                <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
                <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                <SelectItem value="devops">DevOps</SelectItem>
                <SelectItem value="blockchain">Blockchain</SelectItem>
                <SelectItem value="mobile-development">
                  Mobile App Development
                </SelectItem>
                <SelectItem value="game-development">
                  Game Development
                </SelectItem>
                <SelectItem value="ai">Artificial Intelligence</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-8 mt-4">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Back
          </Button>

          <Button disabled={isLoading} onClick={createCourseHandler}>
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
  );
};

export default AddCourse;

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import RichTextEditor from "@/utils/RichTextEditor";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const params = useParams();
  const courseId = params.courseId;

  const [deleteCourse] = useDeleteCourseMutation();

  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  const [input, setinput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const deleteCourseHandler = async () => {
    try {
      const response = await deleteCourse(courseId).unwrap();
      toast.success(response.message || "Course deleted successfully");
      navigate("/admin/course");
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete course");
    }
  };

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course;
      setinput({
        courseTitle: course.courseTitle || "",
        subTitle: course.subTitle || "",
        description: course.description || "",
        category: course.category || "",
        courseLevel: course.courseLevel || "",
        coursePrice: course.coursePrice || "",
        courseThumbnail: course.courseThumbnail || "",
      });
      setpreviewThumbnail(course.courseThumbnail || "");
    }
  }, [courseByIdData]);

  const [previewThumbnail, setpreviewThumbnail] = useState("");

  const navigate = useNavigate();

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const selectCategory = (value) => {
    setinput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setinput({ ...input, courseLevel: value });
  };

  //get file
  const selectThumbNail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setinput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setpreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    await editCourse({ formData, courseId });
  };

  const [publishCourse] = usePublishCourseMutation();

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });

      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.message || "failed to publish or unpublish course");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course Updated");
    }

    if (error) {
      toast.error(error.data.message || "failed to update course");
    }
  }, [isSuccess, error]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };

  if (courseByIdLoading) return <Loader2 className="h-6 w-6 animate-spin mx-auto my-10" />;

   return (
  <section className="bg-white dark:bg-[#111111] min-h-screen py-10 px-4 sm:px-6 lg:px-10">
    <Card className="shadow-md dark:shadow-purple-900/20">
      <CardHeader className="flex flex-col gap-4 md:flex-row justify-between">
        <div>
          <CardTitle className="text-xl md:text-2xl text-gray-900 dark:text-white">
            Basic Course Information
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            Make changes to your course here
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            disabled={courseByIdData?.course.lectures.length === 0}
            variant="outline"
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course.isPublished ? "false" : "true"
              )
            }
          >
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="destructive" onClick={deleteCourseHandler}>
            Remove Course
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <Label className="text-gray-800 dark:text-white">Title</Label>
          <Input
            value={input.courseTitle || ""}
            onChange={changeEventHandler}
            type="text"
            name="courseTitle"
            placeholder="Ex. Fullstack Developer"
            className="bg-white dark:bg-[#1c1c1c] border dark:border-gray-700"
          />
        </div>

        {/* Subtitle */}
        <div className="space-y-2">
          <Label className="text-gray-800 dark:text-white">Subtitle</Label>
          <Input
            value={input.subTitle || ""}
            onChange={changeEventHandler}
            type="text"
            name="subTitle"
            placeholder="Ex. Become a Fullstack Developer in 2 months"
            className="bg-white dark:bg-[#1c1c1c] border dark:border-gray-700"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="text-gray-800 dark:text-white">Description</Label>
          {input && setinput && <RichTextEditor input={input} setinput={setinput} />}
        </div>

        {/* Category, Level, Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-gray-800 dark:text-white">Category</Label>
            <Select onValueChange={selectCategory} value={input.category}>
              <SelectTrigger className="w-full bg-white dark:bg-[#1c1c1c] border dark:border-gray-700">
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

          <div className="space-y-2">
            <Label className="text-gray-800 dark:text-white">Course Level</Label>
            <Select onValueChange={selectCourseLevel} value={input.courseLevel}>
              <SelectTrigger className="w-full bg-white dark:bg-[#1c1c1c] border dark:border-gray-700">
                <SelectValue placeholder="Select a level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-800 dark:text-white">Course Price (INR)</Label>
            <Input
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeEventHandler}
              placeholder="₹ 299"
              className="bg-white dark:bg-[#1c1c1c] border dark:border-gray-700"
            />
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div className="space-y-2">
          <Label className="text-gray-800 dark:text-white">Course Thumbnail</Label>
          <Input
            type="file"
            onChange={selectThumbNail}
            accept="image/*"
            className="w-full max-w-md"
          />
          {previewThumbnail && (
            <img
              src={previewThumbnail}
              className="w-full sm:w-64 mt-4 rounded-lg shadow-md"
              alt="Course Thumbnail"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            onClick={() => navigate("/admin/course")}
            variant="outline"
            className="rounded-md w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={updateCourseHandler}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-md w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  </section>
);

};

export default CourseTab;



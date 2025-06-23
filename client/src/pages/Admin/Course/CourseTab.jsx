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

  if (courseByIdLoading) return <Loader2 className="h- w-4 animate-spin" />;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row  justify-between">
          <div>
            <CardTitle>Basic Course Information</CardTitle>
            <CardDescription>Make Changes to your coruses Here</CardDescription>
          </div>
          <div className="space-x-4">
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
        <CardContent>
          <div className="space-y-4 mt-5">
            <div>
              <Label>Title</Label>
              <Input
                value={input.courseTitle || ""}
                onChange={changeEventHandler}
                type="text"
                name="courseTitle"
                placeholder="Ex. Fullstack Developer"
              />
            </div>
            <div>
              <Label>SubTitle</Label>
              <Input
                value={input.subTitle || ""}
                onChange={changeEventHandler}
                type="text"
                name="subTitle"
                placeholder="Ex. Become A FullStack Developer from zero to hero in 2 months"
              />
            </div>
            <div>
              <Label>Description</Label>
              {input && setinput && (
                <RichTextEditor input={input} setinput={setinput} />
              )}
            </div>
            <div className="flex items-center gap-5">
              <div>
                <Label>Category</Label>
                <Select onValueChange={selectCategory} value={input.category}>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Technical Domains</SelectLabel>
                      <SelectItem value="web-development">
                        Web Development
                      </SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="machine-learning">
                        Machine Learning
                      </SelectItem>
                      <SelectItem value="cloud-computing">
                        Cloud Computing
                      </SelectItem>
                      <SelectItem value="cybersecurity">
                        Cybersecurity
                      </SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                      <SelectItem value="mobile-development">
                        Mobile App Development
                      </SelectItem>
                      <SelectItem value="game-development">
                        Game Development
                      </SelectItem>
                      <SelectItem value="ai">
                        Artificial Intelligence
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Course Level</Label>
                <Select
                  onValueChange={selectCourseLevel}
                  value={input.courseLevel}
                >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Select a category" />
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
              <div>
                <Label>Course price(INR)</Label>
                <Input
                  type="number"
                  name="coursePrice"
                  value={input.coursePrice}
                  onChange={changeEventHandler}
                  placeholder="₹ 299"
                  className="w-fit"
                />
              </div>
            </div>
            <div className="flex gap-8">
              <Label>Course ThumbNail</Label>
              <Input
                type="file"
                onChange={selectThumbNail}
                accept="image/*"
                className="w-fit"
              />
              {previewThumbnail && (
                <>
                  <img
                    src={previewThumbnail}
                    className="w-64 my-2"
                    alt="Course Thumbnail"
                  />
                </>
              )}
            </div>
            <div className="flex gap-8">
              <Button
                onClick={() => {
                  navigate("/admin/course");
                }}
                variant="outline"
              >
                Cancle
              </Button>
              <Button disabled={isLoading} onClick={updateCourseHandler}>
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
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CourseTab;

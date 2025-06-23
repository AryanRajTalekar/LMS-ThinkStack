import { Button } from "@/components/ui/button";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCoursesQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCoursesQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1 className="text-center py-10 text-gray-700 dark:text-gray-300">Loading...</h1>;

  return (
    <section className="min-h-screen bg-white dark:bg-[#111111] py-12 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Heading + Button */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Courses
          </h1>
          <Button
            onClick={() => navigate(`create`)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Create a New Course
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md border dark:border-gray-800">
          <Table>
            <TableCaption className="text-gray-600 dark:text-gray-400">
              A list of your created courses.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-gray-700 dark:text-gray-300">Price</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">Title</TableHead>
                <TableHead className="text-right text-gray-700 dark:text-gray-300">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.courses?.map((course) => (
                <TableRow key={course._id}>
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    ₹ {course.coursePrice || "NA"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        course.isPublished
                          ? "bg-green-600 text-white"
                          : "bg-gray-600 text-white"
                      }
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">
                    {course.courseTitle}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`${course._id}`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default CourseTable;

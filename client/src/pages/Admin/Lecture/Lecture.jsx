import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, index, courseId }) => {
  const navigate = useNavigate();

  const goToUpdateLecture = () => {
    navigate(`${lecture._id}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] py-4 px-5 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 group">
      <h1 className="font-semibold text-gray-800 dark:text-gray-100 text-base sm:text-lg">
        Lecture {index + 1} &mdash;{" "}
        <span className="font-normal">{lecture.lectureTitle}</span>
      </h1>

      <button
        onClick={goToUpdateLecture}
        className="mt-3 sm:mt-0 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
      >
        <Edit size={18} />
        <span>Edit</span>
      </button>
    </div>
  );
};

export default Lecture;

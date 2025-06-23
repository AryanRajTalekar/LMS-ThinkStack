import { CourseProgress } from "../models/courseProgress.model.js";
import { Course } from "../models/course.model.js";

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    //fetch user course progress
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("courseId");
    const courseDetails = await Course.findById(courseId).populate("lectures");

    if (!courseDetails) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    //if no progress found , return course deatils with empty progress

    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseDetails,
          progress: [],
          completed: false,
        },
      });
    }

    //return the user course progress along the course details

    return res.status(200).json({
      data: {
        courseDetails,
        progress: courseProgress.lectureProgress,
        completed: courseProgress.completed,
      },
    });
  } catch (error) {
  console.error("Error in [function name]:", error);
  return res.status(500).json({ message: "Internal Server Error" });
}

};

export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    });

    const courseDetails = await Course.findById(courseId);
    if (!courseDetails) {
      return res.status(404).json({ message: "Course not found" });
    }

    // If no progress exists, create a new one
    if (!courseProgress) {
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }

    // 🔥 THIS BLOCK WAS MISSING WHEN PROGRESS ALREADY EXISTS
    const existingLecture = courseProgress.lectureProgress.find(
      (lecture) => lecture.lectureId.toString() === lectureId
    );

    if (existingLecture) {
      existingLecture.viewed = true;
    } else {
      courseProgress.lectureProgress.push({
        lectureId,
        viewed: true,
      });
    }

    // ✅ Mark as completed if all lectures are viewed
    const viewedCount = courseProgress.lectureProgress.filter(
      (lecture) => lecture.viewed
    ).length;

    if (courseDetails.lectures.length === viewedCount) {
      courseProgress.completed = true;
    }

    await courseProgress.save();

    return res.status(200).json({
      message: "lecture Progress Updated Successfully",
    });
  } catch (error) {
    console.error("Error in updateLectureProgress:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const markAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress)
      return res.status(404).json({ message: "Course progress not found" });

    courseProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = true)
    );
    courseProgress.completed = true;
    await courseProgress.save();
    return res.status(200).json({ message: "Course marked as completed." });
  } catch (error) {
    console.log(error);
  }
};

export const markAsInCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({ courseId, userId });

    if (!courseProgress) {
      return res.status(404).json({
        message: "Course progress not found",
      });
    }

    courseProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = false)
    );
    courseProgress.completed = false;

    await courseProgress.save();

    return res.status(200).json({
      message: "Course marked as incomplete",
    });
  } catch (error) {
  console.error("Error in [function name]:", error);
  return res.status(500).json({ message: "Internal Server Error" });
}

};


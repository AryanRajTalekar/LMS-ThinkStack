import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import {
  deleteMedia,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;

    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course title and Categr]ory are Required",
      });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      course,
      message: "Course Created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};


export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course", error });
  }
};




export const getPublishedCourses = async (_,res) =>{
  try {
    const courses = await Course.find({isPublished:true}).populate({path:"creator",select:"name photoUrl"});

    if(!courses){
      return res.status(404).json({
        message:"No Published Courses Available"
      })
    }

    return res.status(200).json({
      courses,
    })
    
  } catch (error) {
     console.log(error);
    return res.status(500).json({
      message: "Failed to get published course",
    });
  }
}





export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });

    if (!courses) {
      return res.status(404).json({
        courses: [],
        message: "Course not found",
      });
    }

    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to get all courses",
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const Thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course Not Found!!!",
      });
    }

    let courseThumbnail;
    if (Thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMedia(publicId); //delete old image
      }
      //upload thumbnail
      courseThumbnail = await uploadMedia(Thumbnail.path);
    }

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      course,
      message: "course Updated Successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to update course",
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
      });
    }

    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get course by id",
    });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;

    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "Lecture Title is required",
      });
    }

    //create lecture

    const lecture = await Lecture.create({ lectureTitle });

    const course = await Course.findById(courseId);

    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(201).json({
      lecture,
      message: "Lecture Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create Lecture",
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
      });
    }

    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get Lecture",
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        message: "Lecture Not Found",
      });
    }

    //update lecture

    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    if (isPreviewFree) lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    //ensure the course still has the lecture id if it was not already added
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(200).json({
      message: "Lecture updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to Update Lecture",
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture Not Found",
      });
    }

    //delete the lecture from cloudinary as well

    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    // remove the lecture reference from associated course

    await Course.updateOne(
      { lectures: lectureId }, //find the course that contains the lecture
      { $pull: { lectures: lectureId } } //remove the lectures id from the lectures array in course object
    );
    return res.status(200).json({
      message: "Lecture Removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to remove Lecture",
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture Not Found",
      });
    }
    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get Lecture by ID",
    });
  }
};

//publish and unpublish course
export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query; //this is a boolean true or false

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
      });
    }

    course.isPublished = publish === "true";
    await course.save();

    const statusMessage = course.isPublished ? "Published" : "Unpublished";

    return res.status(200).json({
      message: `course is ${statusMessage}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update course status",
    });
  }
};



export const searchCourse = async (req,res) =>{
  try {
    const {query = "",categories = [],sortByPrice=""} = req.query;

    //create seach query

    const searchCriteria = {
      isPublished:true,
      $or:[
        {courseTitle:{$regex:query,$options:"i"}},
        {subTitleTitle:{$regex:query,$options:"i"}},
        {category:{$regex:query,$options:"i"}}
      ]
    }

    //if categories are selected
    if(categories.length>0){
      searchCriteria.category = { $in: categories };
    }

//define sorting order

const sortOptions ={};
if(sortByPrice === "low"){
  sortOptions.coursePrice =1; //ascending order
}else if(sortByPrice === "high"){
  sortOptions.coursePrice = -1; //descending order
}


let courses = await Course.find(searchCriteria).populate({path:"creator",select:"name photoUrl"}).sort(sortOptions);

return res.status(200).json({
  message:"Search Results",
  courses: courses || [],
  success:true,
})



  } catch (error) {
    return res.status(500).json({
      message:"Failed to search courses",
      error:error.message
    });
  }
}

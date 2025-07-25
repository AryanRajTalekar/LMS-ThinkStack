import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import {createCourse, createLecture, deleteCourse, editCourse, editLecture, getCourseById, getCourseLecture, getLectureById, getPublishedCourses, removeLecture, searchCourse, togglePublishCourse} from '../controllers/course.controller.js'
import {getCreatorCourses} from '../controllers/course.controller.js'
import upload from '../utils/multer.js'

const router = express.Router();

router.route('/').post(isAuthenticated,createCourse);

router.route('/search').get(isAuthenticated,searchCourse);

router.route('/').get(isAuthenticated,getCreatorCourses);

router.route('/published-courses').get(getPublishedCourses);


router.route('/:courseId').put(isAuthenticated,upload.single("courseThumbnail"),editCourse);

router.route('/:courseId').delete(isAuthenticated, deleteCourse);




router.route('/:courseId').get(isAuthenticated,getCourseById);

router.route('/:courseId/lecture').post(isAuthenticated,createLecture);

router.route('/:courseId/lecture').get(isAuthenticated,getCourseLecture);

router.route('/:courseId/lecture/:lectureId').post(isAuthenticated,editLecture);

router.route('/lecture/:lectureId').delete(isAuthenticated,removeLecture);

router.route('/lecture/:lectureId').get(isAuthenticated,getLectureById);

router.route('/:courseId').patch(isAuthenticated,togglePublishCourse);



export default router;
import express from "express";
import CourseController from "../controllers/CourseController.js";

const router = express.Router();

router.get("/all/user/:userId", CourseController.getAllCoursesOfUser);
router.get("/all", CourseController.getAllCourses);
router.get("/:courseId", CourseController.getCourseById);
router.delete("/:courseId", CourseController.deleteCourseById);
router.delete("/", CourseController.deleteManyCourses);

export default router;

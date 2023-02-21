import express from "express";
import CourseController from "../controllers/CourseController.js";

const router = express.Router();

router.get("/", CourseController.getCourses);
router.get("/:courseId", CourseController.getCourseById);
router.patch("/:courseId", CourseController.updateCourse);
router.delete("/:courseId", CourseController.deleteCourseById);
router.delete("/", CourseController.deleteManyCourses);

export default router;

import express from "express";
import CourseController from "../controllers/CourseController.js";

const router = express.Router();

router.post("/", CourseController.createCourse);
router.get("/", CourseController.getCourses);
router.get("/:courseId", CourseController.getCourseById);
router.delete("/:courseId", CourseController.deleteCourseById);
router.delete("/", CourseController.deleteManyCourses);

export default router;

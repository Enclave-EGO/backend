import express from "express";
import LessonController from "../controllers/LessonController.js";
const router = express.Router();

router.post("/", LessonController.createLesson);
router.get("/", LessonController.getLessons);
router.get("/:id", LessonController.getLesson);
router.get("/OfCourse/:courseId", LessonController.getListLessonsByCourse);

export default router;

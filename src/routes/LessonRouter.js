import express from "express";
import LessonController from "../controllers/lessonController.js";
const router = express.Router();

router.post("/", LessonController.createLesson);

export default router;

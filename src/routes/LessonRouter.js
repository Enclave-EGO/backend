import express from "express";
import LessonController from "../controllers/LessonController.js";
const router = express.Router();

router.post("/", LessonController.createLesson);

export default router;

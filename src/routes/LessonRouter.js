import express from "express";
import LessonController from "../controllers/LessonController.js";
const router = express.Router();

router.post("/", LessonController.createLesson);
router.get("/", LessonController.getLessons);
router.get("/:id", LessonController.getLesson);
router.patch("/:id", LessonController.updateLesson);
router.delete("/:id", LessonController.deleteLesson);
router.delete("/", LessonController.deleteLessons);
export default router;

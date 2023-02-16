import express from "express";
import lessonController from "../controllers/lessonController.js";
const router = express.Router();

// router.get('/', );

router.post("/", lessonController.createLesson);

export default router;

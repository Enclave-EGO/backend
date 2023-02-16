import express from "express";
import lessonController from "../controllers/lessonController.js";
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello');
});

router.post('/', lessonController.createLesson);

export default router;
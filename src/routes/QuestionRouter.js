import express from "express";
import QuestionController from "../controllers/QuestionController.js";

const router = express.Router();

router.post("/", QuestionController.createQuestion);
router.delete("/:questionId", QuestionController.deleteQuestion);
router.delete("/", QuestionController.deleteQuestions);

export default router;

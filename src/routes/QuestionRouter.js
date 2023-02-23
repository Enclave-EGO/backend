import express from "express";
import QuestionController from "../controllers/QuestionController.js";

const router = express.Router();

router.post("/", QuestionController.createQuestion);

export default router;

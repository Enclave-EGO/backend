import express from "express";
import QuestionController from "../controllers/QuestionController.js";
import { jwtGuard } from "../middlewares/authentication/jwtGuard.js";
import { Roles } from "../middlewares/authentication/roleGuard.js";
import { Role } from "../utils/index.js";

const router = express.Router();

router.post(
  "/",
  jwtGuard,
  Roles(Role.TEACHER),
  QuestionController.createQuestion
);
router.delete("/:questionId", QuestionController.deleteQuestion);
router.delete("/", QuestionController.deleteQuestions);

export default router;

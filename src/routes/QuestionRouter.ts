import express from "express";
import QuestionController from "../controllers/QuestionController";
import { jwtGuard } from "../middlewares/authentication/jwtGuard";
import { Roles } from "../middlewares/authentication/roleGuard";
import { Role } from "../utils/index";

const router = express.Router();

router.post("/", jwtGuard, Roles(Role.TEACHER), QuestionController.createQuestion);
router.patch("/:questionId", jwtGuard, Roles(Role.TEACHER), QuestionController.updateQuestion);
router.delete("/:questionId", jwtGuard, Roles(Role.TEACHER), QuestionController.deleteQuestion);
router.delete("/", jwtGuard, Roles(Role.TEACHER), QuestionController.deleteQuestions);
router.get("/:questionId", jwtGuard, Roles(Role.TEACHER, Role.LEARNER), QuestionController.getQuestion);

export default router;

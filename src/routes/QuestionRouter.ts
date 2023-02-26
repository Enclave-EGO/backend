import QuestionController from "../controllers/QuestionController";
import { Router } from "express";
import { jwtGuard } from "../middlewares/authentication/jwtGuard";
import { Roles } from "../middlewares/authentication/roleGuard";
import { Role } from "../utils";

const router = Router();

router.post("/", QuestionController.createQuestion);
router.patch("/:questionId", QuestionController.updateQuestion);
router.delete("/:questionId", QuestionController.deleteQuestion);
router.delete("/", QuestionController.deleteQuestions);
router.get(
  "/:questionId",
  jwtGuard,
  Roles(Role.TEACHER, Role.LEARNER),
  QuestionController.getQuestion
);

export default router;

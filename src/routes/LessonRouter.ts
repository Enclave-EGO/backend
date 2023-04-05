import express from "express";
import LessonController from "../controllers/LessonController";
import { jwtGuard } from "../middlewares/authentication/jwtGuard";
import { Roles } from "../middlewares/authentication/roleGuard";
import { Role } from "../utils/index";

const router = express.Router();

router.post("/", jwtGuard, Roles(Role.TEACHER), LessonController.createLesson);

router.get(
  "/",
  jwtGuard,
  Roles(Role.LEARNER, Role.TEACHER),
  LessonController.getLessons
);

router.get(
  "/:id",
  jwtGuard,
  Roles(Role.LEARNER, Role.TEACHER),
  LessonController.getLesson
);

router.patch(
  "/:id",
  jwtGuard,
  Roles(Role.TEACHER),
  LessonController.updateLesson
);

router.delete(
  "/:id",
  jwtGuard,
  Roles(Role.TEACHER),
  LessonController.deleteLesson
);

router.delete(
  "/",
  jwtGuard,
  Roles(Role.TEACHER),
  LessonController.deleteLessons
);

export default router;

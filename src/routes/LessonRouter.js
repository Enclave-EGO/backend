import express from "express";
import LessonController from "../controllers/LessonController.js";
import { jwtGuard } from "../middlewares/authentication/jwtGuard.js";
const router = express.Router();
import { Roles } from "../middlewares/authentication/roleGuard.js";
import { Role } from "../utils/index.js";

router.post("/", jwtGuard, Roles(Role.TEACHER), LessonController.createLesson);

router.get(
  "/",
  jwtGuard,
  Roles(Role.LEARNER, Role.TEACHER),
  LessonController.getLessons
);

router.get("/:id", LessonController.getLesson);

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

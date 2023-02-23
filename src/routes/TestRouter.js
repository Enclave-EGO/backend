import express from "express";
import TestController from "../controllers/TestController.js";
import { jwtGuard } from "../middlewares/authentication/jwtGuard.js";
import { Roles } from "../middlewares/authentication/roleGuard.js";
import { Role } from "../utils/index.js";
const router = express.Router();

router.get(
  "/",
  jwtGuard,
  Roles(Role.TEACHER, Role.LEARNER),
  TestController.getTestsByLesson
);

router.get(
  "/:testId",
  jwtGuard,
  Roles(Role.TEACHER, Role.LEARNER),
  TestController.getTestById
);

router.post("/", jwtGuard, Roles(Role.TEACHER), TestController.createTest);

export default router;

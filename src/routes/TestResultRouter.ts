import express from "express";
import TestResultController from "../controllers/TestResultController";
import { jwtGuard } from "../middlewares/authentication/jwtGuard";
import { Roles } from "../middlewares/authentication/roleGuard";
import { Role } from "../utils/index";

const router = express.Router();

router.get(
  "/",
  jwtGuard,
  Roles(Role.TEACHER, Role.LEARNER),
  TestResultController.getTestResult
);

router.post(
  "/",
  jwtGuard,
  Roles(Role.TEACHER, Role.LEARNER),
  TestResultController.submitTest
);

export default router;

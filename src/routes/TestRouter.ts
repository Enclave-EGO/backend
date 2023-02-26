import { Router } from "express";
import TestController from "../controllers/TestController";
import { jwtGuard } from "../middlewares/authentication/jwtGuard";
import { Roles } from "../middlewares/authentication/roleGuard";
import { Role } from "../utils";

const router = Router();

router.post("/", TestController.createTest);
router.patch("/:id", TestController.updateTest);
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

router.delete(
  "/:testId",
  jwtGuard,
  Roles(Role.TEACHER),
  TestController.deleteTest
);

router.delete(
  "/",
  jwtGuard,
  Roles(Role.TEACHER),
  TestController.deleteManyTests
);

export default router;

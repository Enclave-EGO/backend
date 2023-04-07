import express from "express";
import TestController from "../controllers/TestController";
import { jwtGuard } from "../middlewares/authentication/jwtGuard";
import { Roles } from "../middlewares/authentication/roleGuard";
import { Role } from "../utils";

const router = express.Router();

router.post("/", jwtGuard, Roles(Role.TEACHER), TestController.createTest);
router.patch("/:id", jwtGuard, Roles(Role.TEACHER), TestController.updateTest);
router.get("/", jwtGuard, Roles(Role.TEACHER, Role.LEARNER), TestController.getTestsByLesson);
router.get("/:testId", jwtGuard, Roles(Role.TEACHER, Role.LEARNER), TestController.getTestById);
router.delete("/:testId", jwtGuard, Roles(Role.TEACHER), TestController.deleteTest);
router.delete("/", jwtGuard, Roles(Role.TEACHER), TestController.deleteManyTests);

export default router;

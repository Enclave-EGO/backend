import express from "express";
import RegisterController from "../controllers/RegisterController.js";
import { jwtGuard } from "../middlewares/authentication/jwtGuard.js";
import { Roles } from "../middlewares/authentication/roleGuard.js";
import { Role } from "../utils/index.js";
const router = express.Router();

router.post(
  "/",
  jwtGuard,
  Roles(Role.LEARNER),
  RegisterController.registerNewCourse
);

router.delete(
  "/:registerId",
  jwtGuard,
  Roles(Role.TEACHER, Role.LEARNER),
  RegisterController.deleteRegister
);

router.delete(
  "/",
  Roles(Role.TEACHER, Role.LEARNER),
  RegisterController.deleteRegisters
);

export default router;

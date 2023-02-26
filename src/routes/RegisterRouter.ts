import RegisterController from "../controllers/RegisterController";
import { Router } from "express";
import { jwtGuard } from "../middlewares/authentication/jwtGuard";
import { Roles } from "../middlewares/authentication/roleGuard";
import { Role } from "../utils";

const router = Router();

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

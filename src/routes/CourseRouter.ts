import CourseController from "../controllers/CourseController";
import { Router } from "express";
import { jwtGuard } from "../middlewares/authentication/jwtGuard";
import { Roles } from "../middlewares/authentication/roleGuard";
import { Role } from "../utils";

const router = Router();

router.post("/", jwtGuard, Roles(Role.TEACHER), CourseController.createCourse);
router.get("/", CourseController.getCourses);
router.get("/:courseId", CourseController.getCourseById);

router.patch(
  "/:courseId",
  jwtGuard,
  Roles(Role.TEACHER),
  CourseController.updateCourse
);

router.delete(
  "/:courseId",
  jwtGuard,
  Roles(Role.TEACHER),
  CourseController.deleteCourseById
);

router.delete(
  "/",
  jwtGuard,
  Roles(Role.TEACHER),
  CourseController.deleteManyCourses
);

export default router;

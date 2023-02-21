import express from "express";
import LessonController from "../controllers/LessonController.js";
const router = express.Router();
import passport from "passport";
import "../middlewares/authentication/passport.js";
router.post("/", LessonController.createLesson);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  LessonController.getLessons
);
router.get("/:id", LessonController.getLesson);
router.delete("/:id", LessonController.deleteLesson);
router.delete("/", LessonController.deleteLessons);
export default router;

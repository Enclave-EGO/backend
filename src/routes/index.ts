import { Express } from "express";
import AppError from "../utils/appError";
import globalErrorHandler from "../controllers/ErrorController";
import UserRouter from "./UserRouter";
import LessonRouter from "./LessonRouter";
import CourseRouter from "./CourseRouter";
import RegisterRouter from "./RegisterRouter";
import TestRouter from "./TestRouter";
import QuestionRouter from "./QuestionRouter";
import TestResultRouter from "./TestResultRouter";

function routing(app: Express) {
  app.use("/users", UserRouter);
  app.use("/lessons", LessonRouter);
  app.use("/courses", CourseRouter);
  app.use("/registers", RegisterRouter);
  app.use("/tests", TestRouter);
  app.use("/questions", QuestionRouter);
  app.use("/test-results", TestResultRouter);

  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  app.use(globalErrorHandler);
}

export default routing;

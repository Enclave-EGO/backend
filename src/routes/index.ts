import UserRouter from "./UserRouter";
import LessonRouter from "./LessonRouter";
import CourseRouter from "./CourseRouter";
import RegisterRouter from "./RegisterRouter";
import TestRouter from "./TestRouter";
import QuestionRouter from "./QuestionRouter";
import { Express, Request, Response } from "express";

function routing(app: Express) {
  app.use("/users", UserRouter);
  app.use("/lessons", LessonRouter);
  app.use("/courses", CourseRouter);
  app.use("/registers", RegisterRouter);
  app.use("/tests", TestRouter);
  app.use("/questions", QuestionRouter);

  // Notfound routes
  app.use("*", (req: Request, res: Response) => {
    return res.json({
      status: 400,
      message: "not-found",
      error: "not-found"
    });
  });
}

export default routing;

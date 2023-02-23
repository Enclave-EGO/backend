import UserRouter from "./UserRouter.js";
import LessonRouter from "./LessonRouter.js";
import CourseRouter from "./CourseRouter.js";
import RegisterRouter from "./RegisterRouter.js";
import TestRouter from "./TestRouter.js";

function routing(app) {
  app.use("/users", UserRouter);
  app.use("/lessons", LessonRouter);
  app.use("/courses", CourseRouter);
  app.use("/registers", RegisterRouter);
  app.use("/tests", TestRouter);

  // Notfound routes
  app.use("*", (req, res) => {
    res.status(404).json({
      message: "not-found",
      error: "not-found"
    });
  });
}

export default routing;

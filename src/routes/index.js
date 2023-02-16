import UserRouter from "./UserRouter.js";
import LessonRouter from "./LessonRouter.js";

function routing(app) {
	app.use("/user", UserRouter);
	app.use("/lesson", LessonRouter);
}

export default routing;

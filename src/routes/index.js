import UserRouter from "./UserRouter.js";
import LessonRouter from "./LessonRouter.js";
import CourseRouter from "./CourseRouter.js";

function routing(app) {
	app.use("/user", UserRouter);
	app.use("/lesson", LessonRouter);
	app.use("/course", CourseRouter);

	// Notfound routes 
	app.use("*", (req, res, next) => {
		res.status(404).json({
			message: "not-found",
			error: "not-found"
		});
	});
}

export default routing;

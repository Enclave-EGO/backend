import userRouter from "./user.js";
import lesson from "../routes/lesson.js";

function routing(app) {
	app.use("/user", userRouter);
	app.use('/lesson', lesson);
}

export default routing;

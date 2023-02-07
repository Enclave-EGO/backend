import userRouter from "./user.js";

function routing(app) {
	app.use("/user", userRouter);
}

export default routing;

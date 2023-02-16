import Lesson from "../../models/LessonModel.js";

const checkExistedLesson = async (name) => {
	const isExisted = await Lesson.exists({ name }).lean();
	return Boolean(isExisted);
};

export { checkExistedLesson };

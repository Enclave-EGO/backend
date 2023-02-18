import Lesson from "../../models/LessonModel.js";
import Course from "../../models/CourseModel.js";

const checkExistedLessonName = async (name) => {
	const isExisted = await Lesson.exists({ name }).lean();
	return Boolean(isExisted);
};

const checkExistedVideoId = async (videoId) => {
	const isExisted = await Lesson.exists({ videoId }).lean();
	return Boolean(isExisted);
};

const checkExistedCourseId = async (_id) => {
	const isExisted = await Course.exists({ _id }).lean();
	return Boolean(isExisted);
};

const createNewLesson = async (lesson) => {
	const newLesson = new Lesson(lesson);
	const saveLesson = await newLesson.save();
	return saveLesson;
};
export {
	checkExistedLessonName,
	checkExistedVideoId,
	checkExistedCourseId,
	createNewLesson
};

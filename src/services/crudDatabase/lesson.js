import Lesson from "../../models/LessonModel.js";

const checkExistedLessonName = async (name) => {
	const isExisted = await Lesson.exists({ name }).lean();
	return Boolean(isExisted);
};

const checkExistedVideoID = async (videoId) => {
	const isExisted = await Lesson.exists({ videoId }).lean();
	return Boolean(isExisted);
};


const createNewLesson = async (lesson) => {
	const newLesson = new Lesson(lesson);
	const saveLesson = await newLesson.save();
	return saveLesson;
};
export {
	checkExistedLessonName,
	checkExistedVideoID,
	createNewLesson
};

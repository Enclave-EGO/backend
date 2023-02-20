import LessonModel from "../../models/LessonModel.js";
import CourseModel from "../../models/CourseModel.js";

const checkExistedLessonName = async (name) => {
  const isExisted = await LessonModel.exists({ name }).lean();
  return Boolean(isExisted);
};

const checkExistedVideoId = async (videoId) => {
  const isExisted = await LessonModel.exists({ videoId }).lean();
  return Boolean(isExisted);
};

const checkExistedCourseId = async (_id) => {
  const isExisted = await CourseModel.exists({ _id }).lean();
  return Boolean(isExisted);
};

const createNewLesson = async (lesson) => {
  const newLesson = new LessonModel(lesson);
  const saveLesson = await newLesson.save();
  return saveLesson;
};

const findLessonById = async (id) => {
  const lesson = await LessonModel.findById(id).lean();
  return lesson;
};

const findListLessons = async (courseId) => {
  const queryCondition = courseId ? { courseId: courseId } : {};
  const lessons = await LessonModel.find(queryCondition).lean();
  return lessons;
};

export {
  checkExistedLessonName,
  checkExistedVideoId,
  checkExistedCourseId,
  findLessonById,
  findListLessons,
  createNewLesson
};

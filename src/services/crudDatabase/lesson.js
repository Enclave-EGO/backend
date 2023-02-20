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

const findLessons = async () => {
  const lessons = await Lesson.find().lean();
  return lessons;
};

const findLessonById = async (id) => {
  const lesson = await Lesson.findById(id).lean();
  return lesson;
};

const findListLessonsByCourse = async (courseId) => {
  const lessons = await Lesson.find({ courseId: courseId }).lean();
  return lessons;
};

export {
  checkExistedLessonName,
  checkExistedVideoId,
  checkExistedCourseId,
  findLessons,
  findLessonById,
  findListLessonsByCourse,
  createNewLesson
};

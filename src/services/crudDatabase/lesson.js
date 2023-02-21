import LessonModel from "../../models/LessonModel.js";

const checkExistedLessonName = async (name) => {
  const isExisted = await LessonModel.exists({ name }).lean();
  return Boolean(isExisted);
};

const checkExistedVideoId = async (videoId) => {
  const isExisted = await LessonModel.exists({ videoId }).lean();
  return Boolean(isExisted);
};

//[POST]
const createNewLesson = async (lesson) => {
  const newLesson = new LessonModel(lesson);
  const saveLesson = await newLesson.save();
  return saveLesson;
};

//[GET]
const findLessonById = async (lessonId) => {
  const lesson = await LessonModel.findById(lessonId).lean();
  return lesson;
};

const findListLessons = async (courseId) => {
  const queryCondition = courseId ? { courseId: courseId } : {};
  const lessons = await LessonModel.find(queryCondition).lean();
  return lessons;
};

//[DELETE]
const deleteLessonById = async (lessonId) => {
  const lesson = await LessonModel.findOneAndDelete({ _id: lessonId }).lean();
  return lesson;
};

const deleteManyLessons = async (lessonIds) => {
  const deleteInfo = await LessonModel.deleteMany({
    _id: { $in: lessonIds }
  }).lean();
  return deleteInfo;
};

export {
  checkExistedLessonName,
  checkExistedVideoId,
  createNewLesson,
  findLessonById,
  findListLessons,
  deleteLessonById,
  deleteManyLessons
};

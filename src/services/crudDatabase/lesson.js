import LessonModel from "../../models/LessonModel.js";

const checkExistedLessonName = async (name) => {
  const isExisted = await LessonModel.exists({ name }).lean();
  return Boolean(isExisted);
};

const checkExistedVideoId = async (videoId) => {
  const isExisted = await LessonModel.exists({ videoId }).lean();
  return Boolean(isExisted);
};

const checkExistedLessonId = async (lessonId) => {
  const isExisted = await LessonModel.exists({
    _id: lessonId
  }).lean();

  return Boolean(isExisted);
};

// Check if exists lesson by name. Except this lesson.
const checkExistedOtherLessonName = async (lessonId, lessonName) => {
  const lesson = await LessonModel.findOne({
    name: lessonName
  }).lean();

  // If above lesson is exist and it has _id other than above lessonId
  if (lesson && lesson._id !== lessonId) return true;
  else return false;
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

//[PATCH]
const updateExistedLesson = async (lessonId, lessonInfo) => {
  const lesson = await LessonModel.findOneAndUpdate(
    { _id: lessonId },
    lessonInfo
  ).lean();

  return lesson;
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
  checkExistedLessonId,
  checkExistedOtherLessonName,
  createNewLesson,
  findLessonById,
  findListLessons,
  updateExistedLesson,
  deleteLessonById,
  deleteManyLessons
};

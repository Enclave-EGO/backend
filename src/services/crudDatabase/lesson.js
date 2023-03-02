import { ObjectId } from "../../constants/index.js";
import LessonModel from "../../models/LessonModel.js";

export const checkExistedLessonName = async (name) => {
  const isExisted = await LessonModel.exists({ name }).lean();
  return Boolean(isExisted);
};

export const checkExistedVideoId = async (videoId) => {
  const isExisted = await LessonModel.exists({ videoId }).lean();
  return Boolean(isExisted);
};

export const checkExistedLessonId = async (lessonId) => {
  const isExisted = await LessonModel.exists({
    _id: lessonId
  }).lean();

  return Boolean(isExisted);
};

// Check if exists lesson by name. Except this lesson.
export const checkExistedOtherLessonName = async (lessonId, lessonName) => {
  const lesson = await LessonModel.findOne({
    name: lessonName
  }).lean();

  // If above lesson is exist and it has _id other than above lessonId
  if (lesson && lesson._id !== lessonId) return true;
  else return false;
};

export const createNewLesson = async (lesson) => {
  const newLesson = new LessonModel(lesson);
  const saveLesson = await newLesson.save();
  return saveLesson;
};

export const findLessonById = async (lessonId) => {
  const lesson = await LessonModel.findById({
    _id: new ObjectId(lessonId)
  }).lean();
  return lesson;
};

export const findListLessons = async (courseId) => {
  const queryCondition = courseId ? { courseId: new ObjectId(courseId) } : {};
  const lessons = await LessonModel.find(queryCondition).lean();
  return lessons;
};

export const updateExistedLesson = async (lessonId, lessonInfo) => {
  const updatedLesson = await LessonModel.findOneAndUpdate(
    { _id: new ObjectId(lessonId) },
    lessonInfo,
    { new: true }
  ).lean();

  return updatedLesson;
};

export const deleteLessonById = async (lessonId) => {
  const lesson = await LessonModel.findOneAndDelete({
    _id: new ObjectId(lessonId)
  }).lean();
  return lesson;
};

export const deleteManyLessons = async (lessonIds) => {
  const deleteInfo = await LessonModel.deleteMany({
    _id: { $in: lessonIds }
  }).lean();
  return deleteInfo;
};

import LessonModel from "../../models/LessonModel";
import { ObjectId } from "../../constants";

export const checkExistedLessonName = async (name: string) => {
  const isExisted = await LessonModel.exists({ name }).lean();
  return Boolean(isExisted);
};

export const checkExistedVideoId = async (videoId: string) => {
  const isExisted = await LessonModel.exists({ videoId }).lean();
  return Boolean(isExisted);
};

export const checkExistedLessonId = async (lessonId: string) => {
  const isExisted = await LessonModel.exists({
    _id: lessonId
  }).lean();

  return Boolean(isExisted);
};

// Check if exists lesson by name. Except this lesson.
export const checkExistedOtherLessonName = async (
  lessonId: string,
  lessonName: string
) => {
  const lesson = await LessonModel.findOne({
    name: lessonName
  }).lean();

  // If above lesson is exist and it has _id other than above lessonId
  if (lesson && lesson?._id !== new ObjectId(lessonId)) return true;
  else return false;
};

export const createNewLesson = async (lesson: object) => {
  const newLesson = new LessonModel(lesson);
  const saveLesson = await newLesson.save();
  return saveLesson;
};

export const findLessonById = async (lessonId: string) => {
  const lesson = await LessonModel.findById(lessonId).lean();
  return lesson;
};

export const findListLessons = async (courseId: string) => {
  const queryCondition = courseId ? { courseId: courseId } : {};
  const lessons = await LessonModel.find(queryCondition).lean();
  return lessons;
};

export const updateExistedLesson = async (
  lessonId: string,
  lessonInfo: object
) => {
  const updatedLesson = await LessonModel.findOneAndUpdate(
    { _id: lessonId },
    lessonInfo
  ).lean();

  return updatedLesson;
};

export const deleteLessonById = async (lessonId: string) => {
  const lesson = await LessonModel.findOneAndDelete({ _id: lessonId }).lean();
  return lesson;
};

export const deleteManyLessons = async (lessonIds: []) => {
  const deleteInfo = await LessonModel.deleteMany({
    _id: { $in: lessonIds }
  }).lean();

  return deleteInfo;
};

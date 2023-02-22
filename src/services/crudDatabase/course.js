import mongoose from "mongoose";
import CourseModel from "../../models/CourseModel.js";

const checkExistedCourseId = async (courseId) => {
  const isExisted = await CourseModel.exists({
    _id: new mongoose.Types.ObjectId(courseId)
  }).lean();

  return Boolean(isExisted);
};

// Check if exists course by name. Except this course.
const checkExistedOtherCourseName = async (courseId, courseName) => {
  const course = await CourseModel.findOne({
    name: courseName
  }).lean();

  // If above course is exist and it has _id other than above courseId
  if (course && course._id !== courseId) return true;
  else return false;
};

const findListCourses = async (userId) => {
  const queryCondition = userId ? { userId: userId } : {};
  const courses = await CourseModel.find(queryCondition).lean();
  return courses;
};

const getCourseById = async (courseId) => {
  const course = await CourseModel.findOne({ _id: courseId }).lean();
  return course;
};

const updateExistedCourse = async (courseId, courseInfo) => {
  const course = await CourseModel.findOneAndUpdate(
    { _id: courseId },
    courseInfo
  ).lean();

  return course;
};

const deleteCourseById = async (courseId) => {
  const course = await CourseModel.findOneAndDelete({ _id: courseId }).lean();
  return course;
};

const deleteManyCourses = async (courseIds) => {
  const deleteInfo = await CourseModel.deleteMany({
    _id: { $in: courseIds }
  }).lean();

  return deleteInfo;
};

export {
  checkExistedCourseId,
  checkExistedOtherCourseName,
  findListCourses,
  getCourseById,
  updateExistedCourse,
  deleteCourseById,
  deleteManyCourses
};

import { ObjectId } from "~/types";
import CourseModel from "~/models/CourseModel";

export const checkExistedCourseId = async (courseId: string) => {
  const isExisted = await CourseModel.exists({
    _id: new ObjectId(courseId)
  }).lean();

  return Boolean(isExisted);
};

// Check if exists course by name. Except this course.
export const checkExistedOtherCourseName = async (courseId: string, courseName: string) => {
  const course = await CourseModel.findOne({
    name: courseName
  }).lean();

  // If above course is exist and it has _id other than above courseId
  if (course && course._id.toString() !== courseId) return true;
  else return false;
};

export const checkExistedCourseName = async (name: string) => {
  const isExisted = await CourseModel.exists({ name: name }).lean();
  return Boolean(isExisted);
};

export const createNewCourse = async (course) => {
  const newCourse = await CourseModel.create(course);
  return newCourse;
};

export const findListCourses = async (userId: string) => {
  const queryCondition = userId ? { userId: new ObjectId(userId) } : {};
  const courses = await CourseModel.find(queryCondition).lean();
  return courses;
};

export const getCourseById = async (courseId: string) => {
  const course = await CourseModel.findOne({
    _id: new ObjectId(courseId)
  }).lean();
  return course;
};

export const updateExistedCourse = async (courseId: string, courseInfo) => {
  const updatedCourse = await CourseModel.findOneAndUpdate(
    { _id: new ObjectId(courseId) },
    courseInfo,
    {
      new: true
    }
  ).lean();

  return updatedCourse;
};

export const deleteCourseById = async (courseId: string) => {
  const course = await CourseModel.findOneAndDelete({
    _id: new ObjectId(courseId)
  }).lean();
  return course;
};

export const deleteManyCourses = async (courseIds) => {
  const deleteInfo = await CourseModel.deleteMany({
    _id: { $in: courseIds }
  }).lean();

  return deleteInfo;
};

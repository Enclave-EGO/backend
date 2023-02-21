import CourseModel from "../../models/CourseModel.js";

const checkExistedCourseId = async (courseId) => {
  const isExisted = await CourseModel.exists({ _id: courseId }).lean();
  return Boolean(isExisted);
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
  findListCourses,
  getCourseById,
  deleteCourseById,
  deleteManyCourses
};

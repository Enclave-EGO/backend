import CourseModel from "../../models/CourseModel.js";

const checkExistedCourseName = async (name) => {
  const isExisted = await CourseModel.exists({ name: name }).lean();
  return Boolean(isExisted);
};

const createNewCourse = async (course) => {
  const newCourse = await CourseModel.create(course);
  return newCourse;
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
  checkExistedCourseName,
  createNewCourse,
  findListCourses,
  getCourseById,
  deleteCourseById,
  deleteManyCourses
};

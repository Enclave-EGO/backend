import Course from "../../models/CourseModel.js";

const getAllCourses = async () => {
	const courses = await Course.find({}).lean();
	return courses;
};

const getAllCoursesOfUser = async (userId) => {
	const courses = await Course.find({ userId: userId }).lean();
	return courses;
};

const getCourseById = async (courseId) => {
	const course = await Course.findOne({ _id: courseId }).lean();
	return course;
};

export { getAllCourses, getAllCoursesOfUser, getCourseById };

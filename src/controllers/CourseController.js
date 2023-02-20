import {
	getAllCourses,
	getAllCoursesOfUser,
	getCourseById
} from "../services/crudDatabase/course.js";

const LessonController = {
	getAllCourses: async (req, res) => {
		try {
			const courses = await getAllCourses();

			if (courses) {
				return res.status(200).json({
					message: "Success",
					data: courses
				});
			} else {
				return res.status(400).json({
					message: "Fail",
					data: null
				});
			}
		} catch (error) {
			return res.status(400).json({
				message: "Fail",
				data: null
			});
		}
	},

	getAllCoursesOfUser: async (req, res) => {
		try {
			const userId = req.params.userId;
			const courses = await getAllCoursesOfUser(userId);

			if (courses) {
				return res.status(200).json({
					message: "Success",
					data: courses
				});
			} else {
				return res.status(400).json({
					message: "Fail",
					data: null
				});
			}
		} catch (error) {
			return res.status(400).json({
				message: "Fail",
				data: null
			});
		}
	},

	getCourseById: async (req, res) => {
		try {
			const courseId = req.params.courseId;
			const course = await getCourseById(courseId);

			if (course) {
				return res.status(200).json({
					message: "Success",
					data: course
				});
			} else {
				return res.status(400).json({
					message: "Fail",
					data: null
				});
			}
		} catch (error) {
			return res.status(400).json({
				message: "Fail",
				data: null
			});
		}
	}
};

export default LessonController;

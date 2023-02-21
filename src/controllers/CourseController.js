import {
  createNewCourse,
  findListCourses,
  getCourseById,
  deleteCourseById,
  deleteManyCourses,
  checkExistedCourseName
} from "../services/crudDatabase/course.js";
import { checkExistedUserId } from "../services/crudDatabase/user.js";
import { validateCourse } from "../validators/courseValidator.js";

const CourseController = {
  createCourse: async (req, res) => {
    try {
      const { status, error } = await validateCourse(req);
      const { name, userId } = req.body;

      if (status === "Fail")
        return res.status(400).json({
          status: "Fail",
          error: error,
          data: null
        });

      const [isExistedCourseName, isExistedUserId] = await Promise.all([
        checkExistedCourseName(name),
        checkExistedUserId(userId)
      ]);

      if (isExistedCourseName) {
        return res.status(400).json({
          status: "Fail",
          error: "Course name is existed",
          data: null
        });
      }

      if (isExistedUserId === false) {
        return res.status(404).json({
          status: "Fail",
          error: "User ID is not existed",
          data: null
        });
      }

      const course = await createNewCourse(req.body);

      if (course) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: course
        });
      } else {
        return res.status(400).json({
          status: "Fail",
          error: null,
          data: null
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: "Fail",
        error: null,
        data: null
      });
    }
  },

  getCourses: async (req, res) => {
    try {
      const userId = req.query.userId;
      const courses = await findListCourses(userId);

      if (courses) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: courses
        });
      } else {
        return res.status(400).json({
          status: "Fail",
          error: null,
          data: null
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: "Fail",
        error: null,
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
          status: "Success",
          error: null,
          data: course
        });
      } else {
        return res.status(400).json({
          status: "Fail",
          error: null,
          data: null
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: "Fail",
        error: null,
        data: null
      });
    }
  },

  deleteCourseById: async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const course = await deleteCourseById(courseId);

      if (course) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: course
        });
      } else {
        return res.status(400).json({
          status: "Fail",
          error: null,
          data: null
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: "Fail",
        error: null,
        data: null
      });
    }
  },

  deleteManyCourses: async (req, res) => {
    try {
      const courseIds = req.body.courseIds;
      const deleteInfo = await deleteManyCourses(courseIds);
      const deletedCount = deleteInfo.deletedCount;

      if (deletedCount > 0) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: deletedCount
        });
      } else {
        return res.status(400).json({
          status: "Fail",
          error: null,
          data: deletedCount
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: "Fail",
        error: null,
        data: null
      });
    }
  }
};

export default CourseController;

import {
  findListCourses,
  getCourseById,
  deleteCourseById,
  deleteManyCourses,
  updateExistedCourse,
  checkExistedCourseId,
  checkExistedOtherCourseName
} from "../services/crudDatabase/course.js";
import { validateUpdateCourse } from "../validators/courseValidator.js";

const LessonController = {
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
        error: error,
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
        error: error,
        data: null
      });
    }
  },

  updateCourse: async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const name = req.body.name;

      const { status, error } = await validateUpdateCourse(req);
      if (status === "Fail")
        return res.status(400).json({
          status: "Fail",
          error: error,
          data: null
        });

      const [isExistedCourseId, isExistedOtherCourseName] = await Promise.all([
        checkExistedCourseId(courseId),
        checkExistedOtherCourseName(courseId, name)
      ]);
      if (isExistedCourseId === false) {
        return res.status(400).json({
          status: "Fail",
          error: "Course ID is not existed",
          data: null
        });
      }
      if (isExistedOtherCourseName) {
        return res.status(400).json({
          status: "Fail",
          error: "Course name is existed",
          data: null
        });
      }

      const course = await updateExistedCourse(courseId, req.body);
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
        error: error,
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
        error: error,
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
        error: error,
        data: null
      });
    }
  }
};

export default LessonController;

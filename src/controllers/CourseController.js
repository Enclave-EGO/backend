import {
  createNewCourse,
  findListCourses,
  getCourseById,
  deleteCourseById,
  deleteManyCourses,
  updateExistedCourse,
  checkExistedCourseId,
  checkExistedCourseName,
  checkExistedOtherCourseName
} from "../services/crudDatabase/course.js";
import { checkExistedUserId } from "../services/crudDatabase/user.js";
import {
  validateCourse,
  validateUpdateCourse
} from "../validators/courseValidator.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const CourseController = {
  createCourse: catchAsync(async (req, res, next) => {
    const { status, error } = await validateCourse(req);
    const { name, userId } = req.body;

    if (status === "Fail") return next(new AppError(error, 400));

    const [isExistedCourseName, isExistedUserId] = await Promise.all([
      checkExistedCourseName(name),
      checkExistedUserId(userId)
    ]);
    if (isExistedCourseName) {
      return next(new AppError("Course name is existed", 400));
    }
    if (isExistedUserId === false) {
      return next(new AppError("User ID is not existed", 400));
    }

    const course = await createNewCourse(req.body);
    return res.json({
      status: "Success",
      error: null,
      data: course
    });
  }),

  getCourses: catchAsync(async (req, res) => {
    const userId = req.query.userId;
    const courses = await findListCourses(userId);

    return res.json({
      status: "Success",
      error: null,
      data: courses
    });
  }),

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

export default CourseController;

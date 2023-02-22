import {
  checkExistedLessonName,
  checkExistedVideoId,
  createNewLesson,
  findLessonById,
  findListLessons,
  deleteLessonById,
  deleteManyLessons,
  checkExistedLessonId,
  checkExistedOtherLessonName,
  updateExistedLesson
} from "../services/crudDatabase/lesson.js";
import { checkExistedCourseId } from "../services/crudDatabase/course.js";
import {
  validateLesson,
  validateUpdateLesson
} from "../validators/lessonValidator.js";

const LessonController = {
  //[Post] add a lesson
  createLesson: async (req, res) => {
    const { status, error } = await validateLesson(req, res);
    const { name, description, videoId, courseId } = req.body;

    if (status === "Fail")
      return res.status(400).json({
        status: "Fail",
        error: error,
        data: null
      });

    const [isExistedName, isExistedVideoId, isExistedCourseId] =
      await Promise.all([
        checkExistedLessonName(name),
        checkExistedVideoId(videoId),
        checkExistedCourseId(courseId)
      ]);

    const isInvalidLesson =
      isExistedName || isExistedVideoId || isExistedCourseId == false;

    if (isInvalidLesson) {
      return res.status(400).json({
        status: "Fail",
        error: "Invalid Lesson",
        data: null
      });
    }

    try {
      const newLesson = { name, description, videoId, courseId };
      const saveLesson = await createNewLesson(newLesson);

      return res
        .status(200)
        .json({ status: "Success", error: null, data: saveLesson });
    } catch (error) {
      return res.status(500).json({ status: "Fail", error: error, data: null });
    }
  },

  // [GET] View list lessons (by courseID)
  getLessons: async (req, res) => {
    try {
      const courseId = req.query.courseId;
      const lessons = await findListLessons(courseId);

      if (lessons) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: lessons
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

  //[GET] View a lesson
  getLesson: async (req, res) => {
    try {
      const lesson = await findLessonById(req.params.id);

      if (lesson) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: lesson
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

  //[PATCH] Update a lesson
  updateLesson: async (req, res) => {
    try {
      const lessonId = req.params.id;
      const name = req.body.name;

      const { status, error } = await validateUpdateLesson(req);
      if (status === "Fail")
        return res.status(400).json({
          status: "Fail",
          error: error,
          data: null
        });

      const [isExistedLessonId, isExistedOtherLessonName] = await Promise.all([
        checkExistedLessonId(lessonId),
        checkExistedOtherLessonName(lessonId, name)
      ]);
      if (isExistedLessonId === false) {
        return res.status(400).json({
          status: "Fail",
          error: "Lesson ID is not existed",
          data: null
        });
      }
      if (isExistedOtherLessonName) {
        return res.status(400).json({
          status: "Fail",
          error: "Lesson name is existed",
          data: null
        });
      }

      const lesson = await updateExistedLesson(lessonId, req.body);
      if (lesson) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: lesson
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

  //[DELETE] Delete a lesson by id
  deleteLesson: async (req, res) => {
    try {
      const lessonId = req.params.id;
      const lesson = await deleteLessonById(lessonId);

      if (lesson) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: lesson
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

  //[DELETE] Delete lessons
  deleteLessons: async (req, res) => {
    try {
      const lessonIds = req.body.lessonIds;
      const deleteInfo = await deleteManyLessons(lessonIds);
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

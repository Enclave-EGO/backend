import {
  checkExistedLessonName,
  checkExistedVideoId,
  checkExistedCourseId,
  findLessonById,
  findListLessons
} from "../services/crudDatabase/lesson.js";
import { validateLesson } from "../validators/lessonValidator.js";
import { createNewLesson } from "../services/crudDatabase/lesson.js";

const LessonController = {
  // [POST] Add a lesson
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
  }
};

export default LessonController;

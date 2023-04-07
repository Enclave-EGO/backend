import { Request, Response, NextFunction } from "express";
import {
  checkExistedLesson,
  createNewLesson,
  findLessonById,
  findListLessons,
  deleteLessonById,
  deleteManyLessons,
  checkExistedLessonId,
  checkExistedOtherLessonName,
  updateExistedLesson
} from "../services/crudDatabase/lesson";
import { checkExistedCourseId } from "../services/crudDatabase/course";
import { validateLesson, validateUpdateLesson } from "../validators/lessonValidator";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

const LessonController = {
  createLesson: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { status, error } = await validateLesson(req);
    const { name, description, videoId, courseId } = req.body;

    if (status === "Fail") return next(new AppError(error, 400));

    const isExistedCourseId = await checkExistedCourseId(courseId);
    if (isExistedCourseId === false) return next(new AppError("Course Id is not existed", 404));

    const isInvalidLesson = await checkExistedLesson(name, videoId, courseId);
    if (isInvalidLesson) return next(new AppError("Invalid Lesson", 400));

    const newLesson = { name, description, videoId, courseId };
    const saveLesson = await createNewLesson(newLesson);

    return res.json({ status: "Success", error: null, data: saveLesson });
  }),

  getLessons: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const courseId = String(req.query.courseId);
    const lessons = await findListLessons(courseId);
    return res.json({
      status: "Success",
      error: null,
      data: lessons
    });
  }),

  getLesson: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const lesson = await findLessonById(req.params.id);
    return res.json({
      status: "Success",
      error: null,
      data: lesson
    });
  }),

  updateLesson: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const lessonId = req.params.id;
    const name = req.body.name;

    const { status, error } = await validateUpdateLesson(req);
    if (status === "Fail") return next(new AppError(error, 400));

    const [isExistedLessonId, isExistedOtherLessonName] = await Promise.all([
      checkExistedLessonId(lessonId),
      checkExistedOtherLessonName(lessonId, name)
    ]);
    if (isExistedLessonId === false) return next(new AppError("Lesson ID is not existed", 404));
    if (isExistedOtherLessonName) return next(new AppError("Lesson name is existed", 400));

    const lesson = await updateExistedLesson(lessonId, req.body);
    return res.json({
      status: "Success",
      error: null,
      data: lesson
    });
  }),

  deleteLesson: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const lessonId = req.params.id;
    const lesson = await deleteLessonById(lessonId);
    return res.json({
      status: "Success",
      error: null,
      data: lesson
    });
  }),

  deleteLessons: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const lessonIds = req.body.lessonIds;
    const deleteInfo = await deleteManyLessons(lessonIds);
    const deletedCount = deleteInfo; // .deletedCount;

    return res.json({
      status: "Success",
      error: null,
      data: deletedCount
    });
  })
};

export default LessonController;

import { Request } from "express";
import {
  returnValidationResult,
  validateLessonName,
  validateVideoId,
  validateLessonNameOptional,
  validateVideoIdOptional
} from "./index";

export const validateLesson = async (req: Request) => {
  await Promise.all([validateLessonName(req), validateVideoId(req)]);
  return returnValidationResult(req);
};

export const validateUpdateLesson = async (req: Request) => {
  await Promise.all([
    validateLessonNameOptional(req),
    validateVideoIdOptional(req)
  ]);
  return returnValidationResult(req);
};

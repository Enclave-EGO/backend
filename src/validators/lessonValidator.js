import {
  returnValidationResult,
  validateLessonName,
  validateVideoId,
  validateLessonNameOptional,
  validateVideoIdOptional
} from "./index.js";

export const validateLesson = async (req) => {
  await Promise.all([validateLessonName(req), validateVideoId(req)]);
  return returnValidationResult(req);
};

export const validateUpdateLesson = async (req) => {
  await Promise.all([
    validateLessonNameOptional(req),
    validateVideoIdOptional(req)
  ]);
  return returnValidationResult(req);
};

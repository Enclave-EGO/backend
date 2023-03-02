import {
  validateLessonName,
  validateVideoId,
  returnValidationResult
} from "./index.js";

export const validateLesson = async (req) => {
  await Promise.all([validateLessonName(req), validateVideoId(req)]);
  return returnValidationResult(req);
};

export const validateUpdateLesson = async (req) => {
  const isOptional = true;

  await Promise.all([
    validateLessonName(req, isOptional),
    validateVideoId(req, isOptional)
  ]);
  return returnValidationResult(req);
};

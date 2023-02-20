import {
  returnValidationResult,
  validateNameLesson,
  validateVideoID
} from "./index.js";

export const validateLesson = async (req) => {
  await Promise.all([validateNameLesson(req), validateVideoID(req)]);
  return returnValidationResult(req);
};

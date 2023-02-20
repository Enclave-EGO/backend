import {
  returnValidationResult,
  validateNameLesson,
  validateVideoID
} from "./index.js";

const validateLesson = async (req) => {
  await validateNameLesson(req);
  await validateVideoID(req);
  return returnValidationResult(req);
};

export { validateLesson };

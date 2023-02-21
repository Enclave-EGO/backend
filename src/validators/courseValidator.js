import {
  validateCourseNameOptional,
  validateCourseCostOptional,
  validateCourseDescriptionOptional,
  validateCourseThumbnailOptional,
  returnValidationResult
} from "./index.js";

export const validateUpdateCourse = async (req) => {
  await Promise.all([
    validateCourseNameOptional(req),
    validateCourseCostOptional(req),
    validateCourseDescriptionOptional(req),
    validateCourseThumbnailOptional(req)
  ]);
  return returnValidationResult(req);
};

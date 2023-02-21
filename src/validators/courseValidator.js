import {
  validateCourseName,
  validateCourseCost,
  validateCourseDescription,
  validateCourseThumbnail,
  validateCourseUserId,
  returnValidationResult
} from "./index.js";

export const validateCourse = async (req) => {
  await Promise.all([
    validateCourseName(req),
    validateCourseCost(req),
    validateCourseDescription(req),
    validateCourseThumbnail(req),
    validateCourseUserId(req)
  ]);

  return returnValidationResult(req);
};

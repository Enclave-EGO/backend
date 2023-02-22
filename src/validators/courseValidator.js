import {
  validateCourseName,
  validateCourseCost,
  validateCourseDescription,
  validateCourseThumbnail,
  validateCourseUserId,
  validateCourseNameOptional,
  validateCourseCostOptional,
  validateCourseDescriptionOptional,
  validateCourseThumbnailOptional,
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
  
export const validateUpdateCourse = async (req) => {
  await Promise.all([
    validateCourseNameOptional(req),
    validateCourseCostOptional(req),
    validateCourseDescriptionOptional(req),
    validateCourseThumbnailOptional(req)
  ]);
  return returnValidationResult(req);
};

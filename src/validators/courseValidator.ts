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
} from "./index";

export const validateCourse = async (req: Request) => {
  await Promise.all([
    validateCourseName(req),
    validateCourseCost(req),
    validateCourseDescription(req),
    validateCourseThumbnail(req),
    validateCourseUserId(req)
  ]);
  return returnValidationResult(req);
};

export const validateUpdateCourse = async (req: Request) => {
  await Promise.all([
    validateCourseNameOptional(req),
    validateCourseCostOptional(req),
    validateCourseDescriptionOptional(req),
    validateCourseThumbnailOptional(req)
  ]);
  return returnValidationResult(req);
};

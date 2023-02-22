import { body, validationResult } from "express-validator";

const validateNameLesson = async (req) => {
  await body("name")
    .trim()
    .notEmpty()
    .withMessage("Name lesson is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Name lesson must include A-Z")
    .isLength({ min: 10, max: 100 })
    .withMessage("Name lesson must from 10 to 100 characters")
    .run(req);
};

const validateVideoID = async (req) => {
  await body("videoId")
    .trim()
    .notEmpty()
    .withMessage("Video ID is required")
    .isLength(11)
    .withMessage("Video ID is invalid")
    .run(req);
};

const validateUsername = async (req) => {
  await body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 8 })
    .withMessage("Username must have at least 8 characters")
    .matches(`[A-Za-z]+`)
    .withMessage("Username must have A-Z character")
    .run(req);
};

const validatePassword = async (req) => {
  await body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must have at least 8 characters")
    .matches("([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*")
    .withMessage("Password must include at least 1 number and 1 character")
    .run(req);
};

const validateNameUser = async (req) => {
  await body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .matches(`[a-zA-Z]+`)
    .withMessage("Name contains only alphabets")
    .run(req);
};

const validateEmail = async (req) => {
  await body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .matches("([a-zA-Z0-9_.+-])@[a-zA-Z0-9_._-]+.[a-zA-Z0-9_.+-]")
    .withMessage("Email format is invalid")
    .run(req);
};

const validateCourseName = async (req) => {
  await body("name")
    .trim()
    .notEmpty()
    .withMessage("Course name is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Course name must include A-Z")
    .run(req);
};

const validateCourseCost = async (req) => {
  await body("cost")
    .notEmpty()
    .withMessage(`Course cost is required`)
    .matches(/^[1-9][0-9]*$/)
    .withMessage(`Course cost must grater than 0`)
    .run(req);
};

const validateCourseDescription = async (req) => {
  await body("description")
    .trim()
    .notEmpty()
    .withMessage("Course description is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Course description must include A-Z")
    .run(req);
};

const validateCourseThumbnail = async (req) => {
  await body("thumbnail")
    .trim()
    .notEmpty()
    .withMessage("Course thumbnail is required")
    .matches(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    )
    .withMessage("Course thumbnail is invalid")
    .run(req);
};

const validateCourseUserId = async (req) => {
  await body("userId")
    .trim()
    .notEmpty()
    .withMessage("Course userId is required")
    .isLength({ min: 24, max: 24 })
    .withMessage("Course userId must include 24 characters")
    .run(req);
};

const validateCourseNameOptional = async (req) => {
  await body("name")
    .optional({ checkFalsy: true, nullable: true })
    .trim()
    .notEmpty()
    .withMessage("Course name is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Course name must include A-Z")
    .run(req);
};

const validateCourseCostOptional = async (req) => {
  await body("cost")
    .optional({ checkFalsy: true, nullable: true })
    .notEmpty()
    .withMessage(`Course cost is required`)
    .matches(/^[1-9][0-9]*$/)
    .withMessage(`Course cost must grater than 0`)
    .run(req);
};

const validateCourseDescriptionOptional = async (req) => {
  await body("description")
    .optional({ checkFalsy: true, nullable: true })
    .trim()
    .notEmpty()
    .withMessage("Course description is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Course description must include A-Z")
    .run(req);
};

const validateCourseThumbnailOptional = async (req) => {
  await body("thumbnail")
    .optional({ checkFalsy: true, nullable: true })
    .trim()
    .notEmpty()
    .withMessage("Course thumbnail is required")
    .matches(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    )
    .withMessage("Course thumbnail is invalid")
    .run(req);
};

const returnValidationResult = (req) => {
  const errors = validationResult(req);
  return {
    status: errors.isEmpty() ? "Success" : "Fail",
    error: errors.array()[0]?.msg
  };
};

export {
  validateNameLesson,
  validateVideoID,
  validateUsername,
  validatePassword,
  validateNameUser,
  validateEmail,
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
};

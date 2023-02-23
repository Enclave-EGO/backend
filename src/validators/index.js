import { body, validationResult } from "express-validator";

const validateLessonName = async (req) => {
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

const validateVideoId = async (req) => {
  await body("videoId")
    .trim()
    .notEmpty()
    .withMessage("Video Id is required")
    .isLength(11)
    .withMessage("Video Id is invalid")
    .run(req);
};

const validateLessonNameOptional = async (req) => {
  await body("name")
    .optional({ checkFalsy: true, nullable: true })
    .trim()
    .notEmpty()
    .withMessage("Name lesson is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Name lesson must include A-Z")
    .isLength({ min: 10, max: 100 })
    .withMessage("Name lesson must from 10 to 100 characters")
    .run(req);
};

const validateVideoIdOptional = async (req) => {
  await body("videoId")
    .optional({ checkFalsy: true, nullable: true })
    .trim()
    .notEmpty()
    .withMessage("Video Id is required")
    .isLength(11)
    .withMessage("Video Id is invalid")
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
    .withMessage(`Course cost must greater than 0`)
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
    .withMessage(`Course cost must greater than 0`)
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

const validateTestTimeLimit = async (req) => {
  await body("timeLimit")
    .notEmpty()
    .withMessage(`Time limit is required`)
    .matches(/^[1-9][0-9]*$/)
    .withMessage(`Time limit must greater than 0`)
    .run(req);
};

const validateTestScore = async (req) => {
  await body("score")
    .notEmpty()
    .withMessage(`Score is required`)
    .matches(/^[1-9][0-9]*$/)
    .withMessage(`Score must greater than 0`)
    .run(req);
};

const validateTestDescription = async (req) => {
  await body("description")
    .trim()
    .notEmpty()
    .withMessage("Test description is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Test description must include A-Z")
    .run(req);
};

const validateQuestionTestId = async (req) => {
  await body("testId")
    .trim()
    .notEmpty()
    .withMessage("Question testId is required")
    .isLength({ min: 24, max: 24 })
    .withMessage("Question testId must include 24 characters")
    .run(req);
};

const validateQuestionContent = async (req) => {
  await body("content")
    .trim()
    .notEmpty()
    .withMessage("Question content is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Question content must include A-Z")
    .run(req);
};

const validateQuestionIsMultiChoice = async (req) => {
  await body("isMultiChoice")
    .trim()
    .notEmpty()
    .withMessage("Question isMultiChoice is required")
    .isBoolean()
    .withMessage("Question isMultiChoice must a boolean value")
    .run(req);
};

const validateQuestionAnswers = async (req) => {
  await body("answers")
    .notEmpty()
    .withMessage("Question answers is required")
    .isArray({ min: 2, max: 5 })
    .withMessage("Question answers must a array including 2-5 answers")
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
  validateLessonName,
  validateVideoId,
  validateVideoIdOptional,
  validateLessonNameOptional,
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
  validateTestTimeLimit,
  validateTestScore,
  validateTestDescription,
  validateQuestionTestId,
  validateQuestionContent,
  validateQuestionIsMultiChoice,
  validateQuestionAnswers,
  returnValidationResult
};

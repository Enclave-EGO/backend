import { body, validationResult } from "express-validator";

export const validateLessonName = async (req, isOptional = false) => {
  await body("name")
    .optional({
      checkFalsy: isOptional,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Name lesson is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Name lesson must include A-Z")
    .isLength({ min: 10, max: 100 })
    .withMessage("Name lesson must from 10 to 100 characters")
    .run(req);
};

export const validateVideoId = async (req, isOptional = false) => {
  await body("videoId")
    .optional({
      checkFalsy: isOptional,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Video Id is required")
    .isLength(11)
    .withMessage("Video Id is invalid")
    .run(req);
};

export const validateUsername = async (req) => {
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

export const validatePassword = async (req) => {
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

export const validateNameUser = async (req) => {
  await body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .matches(`[a-zA-Z]+`)
    .withMessage("Name contains only alphabets")
    .run(req);
};

export const validateEmail = async (req) => {
  await body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .matches("([a-zA-Z0-9_.+-])@[a-zA-Z0-9_._-]+.[a-zA-Z0-9_.+-]")
    .withMessage("Email format is invalid")
    .run(req);
};

export const validateCourseName = async (req, isOptional = false) => {
  await body("name")
    .optional({
      checkFalsy: isOptional,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Course name is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Course name must include A-Z")
    .run(req);
};

export const validateCourseCost = async (req, isOptional = false) => {
  await body("cost")
    .optional({
      checkFalsy: isOptional,
      nullable: isOptional
    })
    .notEmpty()
    .withMessage(`Course cost is required`)
    .matches(/^[1-9][0-9]*$/)
    .withMessage(`Course cost must greater than 0`)
    .run(req);
};

export const validateCourseDescription = async (req, isOptional = false) => {
  await body("description")
    .optional({
      checkFalsy: isOptional,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Course description is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Course description must include A-Z")
    .run(req);
};

export const validateCourseThumbnail = async (req, isOptional = false) => {
  await body("thumbnail")
    .optional({
      checkFalsy: isOptional,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Course thumbnail is required")
    .matches(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    )
    .withMessage("Course thumbnail is invalid")
    .run(req);
};

export const validateCourseUserId = async (req) => {
  await body("userId")
    .trim()
    .notEmpty()
    .withMessage("Course userId is required")
    .isLength({ min: 24, max: 24 })
    .withMessage("Course userId must include 24 characters")
    .run(req);
};

export const validateTestTimeLimit = async (req, isOptional = false) => {
  await body("timeLimit")
    .optional({
      checkFalsy: isOptional,
      nullable: isOptional
    })
    .notEmpty()
    .withMessage(`Time limit is required`)
    .matches(/^[1-9][0-9]*$/)
    .withMessage(`Time limit must greater than 0`)
    .run(req);
};

export const validateTestScore = async (req, isOptional = false) => {
  await body("score")
    .optional({
      checkFalsy: isOptional,
      nullable: isOptional
    })
    .notEmpty()
    .withMessage(`Score is required`)
    .matches(/^[1-9][0-9]*$/)
    .withMessage(`Score must greater than 0`)
    .run(req);
};

export const validateTestDescription = async (req, isOptional = false) => {
  await body("description")
    .optional({
      checkFalsy: isOptional,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Test description is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Test description must include A-Z")
    .run(req);
};

export const validateQuestionTestId = async (req, isOptional = false) => {
  await body("testId")
    .optional({
      checkFalsy: isOptional,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Question testId is required")
    .isLength({ min: 24, max: 24 })
    .withMessage("Question testId must include 24 characters")
    .run(req);
};

export const validateQuestionContent = async (req, isOptional = false) => {
  await body("content")
    .optional({
      checkFalsy: isOptional,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Question content is required")
    .matches(`[A-Za-z]+`)
    .withMessage("Question content must include A-Z")
    .run(req);
};

export const validateQuestionIsMultiChoice = async (
  req,
  isOptional = false
) => {
  await body("isMultiChoice")
    .optional({
      checkFalsy: isOptional,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Question isMultiChoice is required")
    .isBoolean()
    .withMessage("Question isMultiChoice must a boolean value")
    .run(req);
};

export const validateQuestionScore = async (req, isOptional = false) => {
  await body("score")
    .optional({
      checkFalsy: isOptional,
      nullable: isOptional
    })
    .notEmpty()
    .withMessage(`Question score is required`)
    .matches(/^[1-9][0-9]*$/)
    .withMessage(`Question score must greater than 0`)
    .run(req);
};

export const validateQuestionAnswers = async (req, isOptional = false) => {
  await body("answers")
    .optional({
      checkFalsy: isOptional,
      nullable: isOptional
    })
    .notEmpty()
    .withMessage("Question answers is required")
    .isArray({ min: 2, max: 5 })
    .withMessage("Question answers must a array including 2-5 answers")
    .run(req);
};

export const returnValidationResult = (req) => {
  const errors = validationResult(req);
  return {
    status: errors.isEmpty() ? "Success" : "Fail",
    error: errors.array()[0]?.msg
  };
};

import { body, validationResult } from "express-validator";

const validateNameLesson = async (req) => {
  await body("name")
    .trim()
    .notEmpty()
    .withMessage("Name lesson required")
    .matches(`[A-Za-z]+`)
    .withMessage("Name lesson included A-Z")
    .isLength({ min: 10, max: 100 })
    .withMessage("Name lesson must from 10 to 100 characters")
    .run(req);
};

const validateVideoID = async (req) => {
  await body("videoId")
    .trim()
    .notEmpty()
    .withMessage("Video ID required")
    .isLength(11)
    .withMessage("Video ID invalid")
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
    .withMessage(
      "Password must include at least 1 number and 1 character in a string"
    )
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
    .withMessage("Email Format is incorrect")
    .run(req);
};

const returnValidationResult = (req) => {
  const errors = validationResult(req);
  return {
    status: errors.isEmpty() ? "successfully" : "failed",
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
  returnValidationResult
};

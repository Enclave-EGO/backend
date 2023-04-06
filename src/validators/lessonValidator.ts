import { Request } from "express";
import { body } from "express-validator";
import { returnValidationResult } from "./index";

const validateLessonName = async (req: Request, isOptional = false) => {
  await body("name")
    .optional({
      checkFalsy: false,
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

const validateVideoId = async (req: Request, isOptional = false) => {
  await body("videoId")
    .optional({
      checkFalsy: false,
      nullable: isOptional
    })
    .trim()
    .notEmpty()
    .withMessage("Video Id is required")
    .isLength({ min: 11, max: 11 })
    .withMessage("Video Id is invalid")
    .run(req);
};

export const validateLesson = async (req: Request) => {
  await Promise.all([validateLessonName(req), validateVideoId(req)]);
  return returnValidationResult(req);
};

export const validateUpdateLesson = async (req: Request) => {
  const isOptional = true;
  await Promise.all([validateLessonName(req, isOptional), validateVideoId(req, isOptional)]);
  return returnValidationResult(req);
};

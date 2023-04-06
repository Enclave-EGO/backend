import { Request } from "express";
import { body } from "express-validator";
import { returnValidationResult } from "./index";

const validateUsername = async (req: Request) => {
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

const validatePassword = async (req: Request) => {
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

const validateNameUser = async (req: Request) => {
  await body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .matches(`[a-zA-Z]+`)
    .withMessage("Name contains only alphabets")
    .run(req);
};

const validateEmail = async (req: Request) => {
  await body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .matches("([a-zA-Z0-9_.+-])@[a-zA-Z0-9_._-]+.[a-zA-Z0-9_.+-]")
    .withMessage("Email format is invalid")
    .run(req);
};

export const validateUser = async (req: Request) => {
  await Promise.all([
    validateUsername(req),
    validatePassword(req),
    validateNameUser(req),
    validateEmail(req)
  ]);
  return returnValidationResult(req);
};

export const validateSignIn = async (req: Request) => {
  await Promise.all([validateUsername(req), validatePassword(req)]);
  return returnValidationResult(req);
};

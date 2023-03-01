import {
  validateEmail,
  validateNameUser,
  validatePassword,
  validateUsername,
  returnValidationResult
} from "./index.js";

export const validateUser = async (req) => {
  await Promise.all([
    validateUsername(req),
    validatePassword(req),
    validateNameUser(req),
    validateEmail(req)
  ]);
  return returnValidationResult(req);
};

export const validateSignIn = async (req) => {
  await Promise.all([validateUsername(req), validatePassword(req)]);
  return returnValidationResult(req);
};

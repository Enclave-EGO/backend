import {
  returnValidationResult,
  validateEmail,
  validateNameUser,
  validatePassword,
  validateUsername
} from "./index";

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

import {
  returnValidationResult,
  validateEmail,
  validateNameUser,
  validatePassword,
  validateUsername
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

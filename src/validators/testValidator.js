import {
  validateTestTimeLimit,
  validateTestDescription,
  validateTestScore,
  returnValidationResult
} from "./index.js";

export const validateTest = async (req) => {
  await Promise.all([
    validateTestTimeLimit(req),
    validateTestDescription(req),
    validateTestScore(req)
  ]);

  return returnValidationResult(req);
};

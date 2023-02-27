import {
  validateTestTimeLimit,
  validateTestDescription,
  validateTestScore,
  returnValidationResult,
  validateTestTimeLimitOptional,
  validateTestDescriptionOptional,
  validateTestScoreOptional
} from "./index.js";

export const validateTest = async (req) => {
  await Promise.all([
    validateTestTimeLimit(req),
    validateTestDescription(req),
    validateTestScore(req)
  ]);

  return returnValidationResult(req);
};

export const validateUpdateTestOptional = async (req) => {
  await Promise.all([
    validateTestTimeLimitOptional(req),
    validateTestDescriptionOptional(req),
    validateTestScoreOptional(req)
  ]);

  return returnValidationResult(req);
};

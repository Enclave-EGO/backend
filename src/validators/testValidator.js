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

export const validateUpdateTestOptional = async (req) => {
  const isOptional = true;

  await Promise.all([
    validateTestTimeLimit(req, isOptional),
    validateTestDescription(req, isOptional),
    validateTestScore(req, isOptional)
  ]);

  return returnValidationResult(req);
};

import { Request } from "express";
import {
  validateTestTimeLimit,
  validateTestDescription,
  validateTestScore,
  returnValidationResult,
  validateTestTimeLimitOptional,
  validateTestDescriptionOptional,
  validateTestScoreOptional
} from "./index";

export const validateTest = async (req: Request) => {
  await Promise.all([
    validateTestTimeLimit(req),
    validateTestDescription(req),
    validateTestScore(req)
  ]);
  return returnValidationResult(req);
};

export const validateUpdateTestOptional = async (req: Request) => {
  await Promise.all([
    validateTestTimeLimitOptional(req),
    validateTestDescriptionOptional(req),
    validateTestScoreOptional(req)
  ]);
  return returnValidationResult(req);
};

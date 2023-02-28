import { Request } from "express";
import {
  validateQuestionTestId,
  validateQuestionContent,
  validateQuestionIsMultiChoice,
  validateQuestionScore,
  validateQuestionAnswers,
  validateQuestionContentOptional,
  validateQuestionIsMultiChoiceOptional,
  validateQuestionScoreOptional,
  validateQuestionAnswersOptional,
  returnValidationResult
} from "./index";

export const validateCreateQuestion = async (req: Request) => {
  await Promise.all([
    validateQuestionTestId(req),
    validateQuestionContent(req),
    validateQuestionIsMultiChoice(req),
    validateQuestionScore(req),
    validateQuestionAnswers(req)
  ]);
  return returnValidationResult(req);
};

export const validateUpdateQuestion = async (req: Request) => {
  await Promise.all([
    validateQuestionContentOptional(req),
    validateQuestionIsMultiChoiceOptional(req),
    validateQuestionScoreOptional(req),
    validateQuestionAnswersOptional(req)
  ]);
  return returnValidationResult(req);
};

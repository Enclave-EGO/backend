import {
  validateQuestionTestId,
  validateQuestionContent,
  validateQuestionIsMultiChoice,
  validateQuestionScore,
  validateQuestionAnswers,
  returnValidationResult
} from "./index.js";

export const validateCreateQuestion = async (req) => {
  await Promise.all([
    validateQuestionTestId(req),
    validateQuestionContent(req),
    validateQuestionIsMultiChoice(req),
    validateQuestionScore(req),
    validateQuestionAnswers(req)
  ]);
  return returnValidationResult(req);
};

export const validateUpdateQuestion = async (req) => {
  const isOptional = true;
  
  await Promise.all([
    validateQuestionTestId(req, isOptional),
    validateQuestionContent(req, isOptional),
    validateQuestionIsMultiChoice(req, isOptional),
    validateQuestionScore(req, isOptional),
    validateQuestionAnswers(req, isOptional)
  ]);
  return returnValidationResult(req);
};

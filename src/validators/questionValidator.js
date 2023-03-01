import {
  validateQuestionTestId,
  validateQuestionContent,
  validateQuestionIsMultiChoice,
  validateQuestionScore,
  validateQuestionAnswers,
  validateQuestionTestIdOptional,
  validateQuestionContentOptional,
  validateQuestionIsMultiChoiceOptional,
  validateQuestionScoreOptional,
  validateQuestionAnswersOptional,
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
  await Promise.all([
    validateQuestionTestIdOptional(req),
    validateQuestionContentOptional(req),
    validateQuestionIsMultiChoiceOptional(req),
    validateQuestionScoreOptional(req),
    validateQuestionAnswersOptional(req)
  ]);
  return returnValidationResult(req);
};

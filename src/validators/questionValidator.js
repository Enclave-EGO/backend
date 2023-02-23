import {
  validateQuestionTestId,
  validateQuestionContent,
  validateQuestionIsMultiChoice,
  validateQuestionAnswers,
  returnValidationResult
} from "./index.js";

export const validateCreateQuestion = async (req) => {
  await Promise.all([
    validateQuestionTestId(req),
    validateQuestionContent(req),
    validateQuestionIsMultiChoice(req),
    validateQuestionAnswers(req)
  ]);
  return returnValidationResult(req);
};

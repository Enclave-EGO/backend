import { returnValidationResult } from "./index.js";

export const validateCreateQuestion = async (req) => {
  return returnValidationResult(req);
};

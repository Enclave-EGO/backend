import { Request } from "express";
import { validationResult } from "express-validator";

export const returnValidationResult = (req: Request) => {
  const errors = validationResult(req);
  return {
    status: errors.isEmpty() ? "Success" : "Fail",
    error: errors.array()[0]?.msg
  };
};

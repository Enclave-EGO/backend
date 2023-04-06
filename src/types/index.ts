import mongoose from "mongoose";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export const ObjectId = mongoose.Types.ObjectId;

export type Error = {
  path: any;
  value: any;
  message: { match: (arg0: RegExp) => any[] };
  statusCode: number;
  status: string;
  stack: any;
  isOperational: boolean;
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {};

export type RequestMiddleware = {
  req: Request;
  res: Response;
  next: NextFunction;
};

export type RequestErrorHandlerMiddleware = {
  err: any;
  req: Request;
  res: Response;
  next: NextFunction;
};

export type TokenPayload = { _id: typeof ObjectId; role: number };

export type InputAnswer = {
  content: string;
  isCorrect: boolean;
};

export type InputAnswerForUpdate = {
  answerId: string;
  content: string;
  isCorrect: boolean;
};

// export type NewAnswer = {
//   content: string;
//   isCorrect: boolean;
// };

export type NewQuestionBody = {
  testId: string;
  content: string;
  isMultiChoice: boolean;
  score: number;
  answers: NewAnswer[];
};

export type UpdateQuestionBody = {
  content: string;
  isMultiChoice: boolean;
  score: number;
  answers: InputAnswerForUpdate[];
};

export type UserPayload = {
  _id: string;
  role: number;
};

export type UserSignUp = {
  username: string;
  password: string;
  name: string;
  email: string;
  role: number;
};

export type UserSignIn = {
  username: string;
  password: string;
};

export type RegisterForm = {
  userId: string;
  courseId: string;
};

export interface NewAnswer {
  questionId: Types.ObjectId;
  content: string;
  isCorrect: boolean;
}

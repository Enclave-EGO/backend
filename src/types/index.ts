import mongoose, { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";

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

export type TokenPayload = {
  _id: Types.ObjectId;
  role: number;
};

export interface CourseCreate {
  name: string;
  cost: number;
  description: string;
  thumbnail: string;
  userId: Types.ObjectId;
}

export interface CourseUpdate {
  name: string;
  cost: number;
  description: string;
  thumbnail: string;
  userId: Types.ObjectId;
}

export interface Lesson {
  name: string;
  description: string;
  videoId: string;
  courseId: Types.ObjectId;
}

export interface CheckDidTestBody {
  userId: string;
  testId: string;
}

export interface TestCreateBody {
  lessonId: string;
  timeLimit: number;
  description: string;
}

export interface TestCreate {
  timeLimit: number;
  description: string;
}

export type InputAnswer = {
  content: string;
  isCorrect: boolean;
};

export type InputAnswerForUpdate = {
  answerId: Types.ObjectId;
  content: string;
  isCorrect: boolean;
};

export interface NewAnswer {
  questionId?: Types.ObjectId;
  content: string;
  isCorrect: boolean;
}

export interface AnswerUpdate {
  answerId: Types.ObjectId;
  content: string;
  isCorrect: boolean;
}

export type QuestionCreate = {
  testId: Types.ObjectId;
  content: string;
  isMultiChoice: boolean;
  score: number;
};

export type QuestionUpdate = {
  content: string;
  isMultiChoice: boolean;
  score: number;
};

export type QuestionCreateBody = {
  testId: string;
  content: string;
  isMultiChoice: boolean;
  score: number;
  answers: NewAnswer[];
};

export type QuestionUpdateBody = {
  testId: string;
  content: string;
  isMultiChoice: boolean;
  score: number;
  answers: InputAnswerForUpdate[];
};

export type TestResultBody = {
  userId: string;
  testId: string;
  results: any[];
};

export type UserPayload = {
  _id: Types.ObjectId;
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
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
};

export type RegisterFormBody = {
  userId: string;
  courseId: string;
};

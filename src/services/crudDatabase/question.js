import mongoose from "mongoose";
import QuestionModel from "../../models/QuestionModel.js";
import { handleCreateNewAnswers } from "./answer.js";

export const checkExistedQuestionContent = async (content) => {
  const isExisted = await QuestionModel.exists({
    content: content
  }).lean();

  return Boolean(isExisted);
};

export const createNewQuestion = async (question) => {
  const newQuestion = await QuestionModel.create(question).lean();
  return newQuestion;
};

export const handleCreateNewQuestion = async (question) => {
  const { testId, content, isMultiChoice, answers } = question;

  // 1. Create question
  const newQuestion = {
    testId: new mongoose.Types.ObjectId(testId),
    content: content,
    isMultiChoice: isMultiChoice,
    score: score
  };
  const saveQuestion = await createNewQuestion(newQuestion);

  // 2. Create answers
  const questionId = saveQuestion._id;
  await handleCreateNewAnswers(questionId, answers);

  return saveQuestion;
};

import mongoose from "mongoose";
import QuestionModel from "../../models/QuestionModel.js";
import AnswerModel from "../../models/AnswerModel.js";
import { handleCreateNewAnswers } from "./answer.js";

export const createNewQuestion = async (question) => {
  const newQuestion = await QuestionModel.create(question);
  return newQuestion;
};

export const handleCreateNewQuestion = async (question) => {
  const { testId, content, isMultiChoice, answers } = question;

  // 1. Create question
  const newQuestion = {
    testId: new mongoose.Types.ObjectId(testId),
    content: content,
    isMultiChoice: isMultiChoice
  };
  const savedQuestion = await createNewQuestion(newQuestion);

  // 2. Create answers
  const questionId = savedQuestion._id;
  const createdAnswers = await handleCreateNewAnswers(questionId, answers);

  // 3. Return result (saved question and answers)
  const isCreatedQuestionAndAnswers =
    savedQuestion && createdAnswers.includes(null) === false;
  const result = isCreatedQuestionAndAnswers
    ? {
        question: savedQuestion,
        answers: createdAnswers
      }
    : null;

  return result;
};

export const getQuestionDetail = async (questionId) => {
  const question = await QuestionModel.findOne(
    { _id: questionId },
    { _id: true, content: true, isMultiChoice: true }
  ).lean();

  const answers = await AnswerModel.find(
    { questionId },
    { _id: true, content: true, isCorrect: true }
  ).lean();

  const output = { ...question, answers };
  return output;
};

import mongoose from "mongoose";
import QuestionModel from "../../models/QuestionModel.js";
import AnswerModel from "../../models/AnswerModel.js";
import {
  handleCreateNewAnswers,
  handleUpdateAnswers,
  deleteAnswersOfQuestion
} from "./answer.js";

export const checkExistedQuestion = async (questionId) => {
  const isExisted = await QuestionModel.exists({
    _id: new mongoose.Types.ObjectId(questionId)
  }).lean();

  return Boolean(isExisted);
};

export const createNewQuestion = async (question) => {
  const newQuestion = await QuestionModel.create(question);
  return newQuestion;
};

export const handleCreateNewQuestion = async (question) => {
  const { testId, content, isMultiChoice, score, answers } = question;

  // 1. Create question
  const newQuestion = {
    testId: new mongoose.Types.ObjectId(testId),
    content: content,
    isMultiChoice: isMultiChoice,
    score: score
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

export const updateQuestion = async (questionId, newQuestion) => {
  const updatedQuestion = await QuestionModel.findOneAndUpdate(
    { _id: questionId },
    newQuestion
  );

  return updatedQuestion;
};

export const handleUpdateQuestion = async (questionId, questionInfo) => {
  const { content, isMultiChoice, score, answers } = questionInfo;

  // 1. Update question and its answers
  const updateQuestionInfo = {
    content,
    isMultiChoice,
    score
  };

  const [updatedQuestion, updatedAnswers] = await Promise.all([
    updateQuestion(questionId, updateQuestionInfo),
    handleUpdateAnswers(questionId, answers)
  ]);

  // 2. Return update status
  const isUpdatedQuestionAndAnswers =
    updatedQuestion && updatedAnswers.includes(null) === false;

  return isUpdatedQuestionAndAnswers;
};

export const deleteQuestionById = async (questionId) => {
  const deletedQuestion = await QuestionModel.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(questionId)
  }).lean();

  return deletedQuestion;
};

export const handleDeleteQuestionById = async (questionId) => {
  const [deletedQuestion, deletedAnswers] = await Promise.all([
    deleteQuestionById(questionId),
    deleteAnswersOfQuestion(questionId)
  ]);

  const isDeleted = deletedQuestion && deletedAnswers.deletedCount > 0;

  return isDeleted;
};

export const handleDeleteManyQuestions = async (questionIds) => {
  const promises = questionIds.map((questionId) =>
    handleDeleteQuestionById(questionId)
  );

  const promiseResult = await Promise.all(promises);

  const isDeleted = promiseResult.includes(null) ? false : true;

  return isDeleted;
};

export const getQuestionsByTests = async (testIds) => {
  const listQuestions = await QuestionModel.find(
    { testId: { $in: testIds } },
    { _id: true }
  ).lean();

  return listQuestions;
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

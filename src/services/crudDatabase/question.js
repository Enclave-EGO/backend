import mongoose from "mongoose";
import QuestionModel from "../../models/QuestionModel.js";
import AnswerModel from "../../models/AnswerModel.js";
import { handleCreateNewAnswers, deleteAnswersOfQuestion } from "./answer.js";

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

  const promiseResult = await Promise.all([promises]);

  const isDeleted = promiseResult.includes(null) ? false : true;
  return isDeleted;
}
  
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

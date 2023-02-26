import QuestionModel from "../../models/QuestionModel";
import AnswerModel from "../../models/AnswerModel";
import { ObjectId } from "../../constants";
import { NewQuestionBody, UpdateQuestionBody } from "../../types";
import {
  handleCreateNewAnswers,
  handleUpdateAnswers,
  deleteAnswersOfQuestion
} from "./answer";

export const checkExistedQuestion = async (questionId: string) => {
  const isExisted = await QuestionModel.exists({
    _id: new ObjectId(questionId)
  }).lean();

  return Boolean(isExisted);
};

export const createNewQuestion = async (question: object) => {
  const newQuestion = await QuestionModel.create(question);
  return newQuestion;
};

export const handleCreateNewQuestion = async (question: NewQuestionBody) => {
  const { testId, content, isMultiChoice, score, answers } = question;

  // 1. Create question
  const newQuestion = {
    testId: new ObjectId(testId),
    content: content,
    isMultiChoice: isMultiChoice,
    score: score
  };
  const savedQuestion = await createNewQuestion(newQuestion);

  // 2. Create answers
  const questionId = savedQuestion._id;
  const createdAnswers = await handleCreateNewAnswers(
    String(questionId),
    answers
  );

  // 3. Return result (saved question and answers)
  const isCreatedQuestionAndAnswers = savedQuestion && createdAnswers;
  // savedQuestion && createdAnswers.includes(null) === false;
  const result = isCreatedQuestionAndAnswers
    ? {
        question: savedQuestion,
        answers: createdAnswers
      }
    : null;

  return result;
};

export const updateQuestion = async (
  questionId: string,
  newQuestion: object
) => {
  const updatedQuestion = await QuestionModel.findOneAndUpdate(
    { _id: new ObjectId(questionId) },
    newQuestion
  );

  return updatedQuestion;
};

export const handleUpdateQuestion = async (
  questionId: string,
  question: UpdateQuestionBody
) => {
  const { content, isMultiChoice, score, answers } = question;

  // 1. Update question and its answers
  const questionInfo = {
    content,
    isMultiChoice,
    score
  };

  const [updatedQuestion, updatedAnswers] = await Promise.all([
    updateQuestion(questionId, questionInfo),
    handleUpdateAnswers(answers)
  ]);

  // 2. Return update status
  const isUpdatedQuestionAndAnswers =
    updatedQuestion && updatedAnswers.includes(null) === false;

  return isUpdatedQuestionAndAnswers;
};

export const deleteQuestionById = async (questionId: string) => {
  const deletedQuestion = await QuestionModel.findOneAndDelete({
    _id: new ObjectId(questionId)
  }).lean();

  return deletedQuestion;
};

export const handleDeleteQuestionById = async (questionId: string) => {
  const [deletedQuestion, deletedAnswers] = await Promise.all([
    deleteQuestionById(questionId),
    deleteAnswersOfQuestion(questionId)
  ]);

  const isDeleted = deletedQuestion && deletedAnswers.deletedCount > 0;

  return isDeleted;
};

export const handleDeleteManyQuestions = async (questionIds: string[]) => {
  const promises = questionIds.map((questionId: string) =>
    handleDeleteQuestionById(questionId)
  );

  const promiseResult = await Promise.all(promises);

  const isDeleted = promiseResult.includes(null) ? false : true;

  return isDeleted;
};

export const getQuestionsByTests = async (testIds: string[]) => {
  const listQuestions = await QuestionModel.find(
    { testId: { $in: testIds } },
    { _id: true }
  ).lean();

  return listQuestions;
};

export const getQuestionDetail = async (questionId: string) => {
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

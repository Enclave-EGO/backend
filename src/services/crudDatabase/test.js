import mongoose from "mongoose";
import TestModel from "../../models/TestModel.js";
import QuestionModel from "../../models/QuestionModel.js";
import {
  getQuestionDetail,
  getQuestionsByTests,
  handleDeleteManyQuestions
} from "./question.js";

const checkExistedTestId = async (testId) => {
  const isExisted = await TestModel.exists({
    _id: new mongoose.Types.ObjectId(testId)
  }).lean();
  return Boolean(isExisted);
};

const createNewTest = async (test) => {
  const newTest = await TestModel.create(test);
  return newTest;
};

const updateExistedTest = async (testId, testInfo) => {
  const updatedTest = await TestModel.findOneAndUpdate(
    { _id: testId },
    testInfo
  ).lean();
  return updatedTest;
};

const getTestDetail = async (testId) => {
  const [test, questions] = await Promise.all([
    TestModel.findOne(
      { _id: testId },
      { _id: true, timeLimit: true, score: true, created: true }
    ).lean(),
    QuestionModel.find({ testId }, { _id: true })
  ]);

  const promiseQuestionDetails = questions.map((question) => {
    return getQuestionDetail(question._id);
  });

  const questionDetails = await Promise.all(promiseQuestionDetails);

  return { ...test, questions: questionDetails };
};

const getTestsByLesson = async (lessonId) => {
  const [count, listTests] = await Promise.all([
    TestModel.find({ lessonId }).count(),
    TestModel.find({ lessonId }, { _id: true }).lean()
  ]);

  const listPromiseTestDetails = listTests.map((_id) => {
    return getTestDetail(_id);
  });

  const listTestDetails = await Promise.all(listPromiseTestDetails);
  const output = { count, tests: listTestDetails };

  return output;
};

const deleteTestsByIds = async (testIds) => {
  const output = await TestModel.deleteMany({
    _id: { $in: testIds }
  }).lean();
  return output;
};

const handleDeleteTests = async (testIds) => {
  const listQuestions = await getQuestionsByTests(testIds);

  const listQuestionIds = listQuestions.map((question) => question._id);

  const [deleteTest, deleteQuestion] = await Promise.all([
    deleteTestsByIds(testIds),
    handleDeleteManyQuestions(listQuestionIds)
  ]);

  const isDeleted = Boolean(deleteTest.deletedCount) && Boolean(deleteQuestion);

  return isDeleted;
};

const updateTestScore = async (testId, score) => {
  const updatedTest = await TestModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(testId) },
    { score: score }
  );
  return updatedTest;
};

export {
  checkExistedTestId,
  createNewTest,
  updateExistedTest,
  getTestDetail,
  getTestsByLesson,
  handleDeleteTests,
  updateTestScore
};

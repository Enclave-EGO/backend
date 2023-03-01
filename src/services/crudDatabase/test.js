import TestModel from "../../models/TestModel.js";
import QuestionModel from "../../models/QuestionModel.js";
import {
  getQuestionDetail,
  getQuestionsByTests,
  handleDeleteManyQuestions
} from "./question.js";
import { ObjectId } from "../../constants/index.js";

export const checkExistedTest = async (testId) => {
  const isExisted = await TestModel.exists({
    _id: new ObjectId(testId)
  }).lean();
  return Boolean(isExisted);
};

export const createNewTest = async (test) => {
  const newTest = await TestModel.create({
    lessonId: test.lessonId,
    timeLimit: test.timeLimit,
    description: test.description
  });

  return newTest;
};

export const updateExistedTest = async (testId, testInfo) => {
  const updatedTest = await TestModel.findOneAndUpdate(
    { _id: new ObjectId(testId) },
    testInfo
  ).lean();
  return updatedTest;
};

export const getTestDetail = async (testId) => {
  const [test, questions] = await Promise.all([
    TestModel.findOne(
      { _id: new ObjectId(testId) },
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

export const getTestsByLesson = async (lessonId) => {
  const [count, listTests] = await Promise.all([
    TestModel.find({ lessonId: new ObjectId(lessonId) }).count(),
    TestModel.find({ lessonId: new ObjectId(lessonId) }, { _id: true }).lean()
  ]);

  const listPromiseTestDetails = listTests.map((_id) => {
    return getTestDetail(_id);
  });

  const listTestDetails = await Promise.all(listPromiseTestDetails);
  const output = { count, tests: listTestDetails };

  return output;
};

export const deleteTestsByIds = async (testIds) => {
  const output = await TestModel.deleteMany({
    _id: { $in: testIds }
  }).lean();
  return output;
};

export const handleDeleteTests = async (testIds) => {
  const listQuestions = await getQuestionsByTests(testIds);

  const listQuestionIds = listQuestions.map((question) => question._id);

  const [deleteTest, deleteQuestion] = await Promise.all([
    deleteTestsByIds(testIds),
    handleDeleteManyQuestions(listQuestionIds)
  ]);

  const isDeleted = Boolean(deleteTest.deletedCount) && Boolean(deleteQuestion);

  return isDeleted;
};

export const updateTestScore = async (testId, score) => {
  const updatedTest = await TestModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(testId) },
    { score: score }
  );
  return updatedTest;
};

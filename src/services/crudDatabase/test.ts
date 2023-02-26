import QuestionModel from "../../models/QuestionModel";
import TestModel from "../../models/TestModel";
import { ObjectId } from "../../constants";
import {
  getQuestionDetail,
  getQuestionsByTests,
  handleDeleteManyQuestions
} from "./question";

export const checkExistedTestId = async (testId: string) => {
  const isExisted = await TestModel.exists({
    _id: new ObjectId(testId)
  }).lean();

  return Boolean(isExisted);
};

export const createNewTest = async (test: object) => {
  const newTest = await TestModel.create(test);
  return newTest;
};

export const updateExistedTest = async (testId: string, testInfo: object) => {
  const updatedTest = await TestModel.findOneAndUpdate(
    { _id: testId },
    testInfo
  ).lean();
  return updatedTest;
};

export const getTestDetail = async (testId: string) => {
  const [test, questions] = await Promise.all([
    TestModel.findOne(
      { _id: testId },
      { _id: true, timeLimit: true, score: true, created: true }
    ).lean(),
    QuestionModel.find({ testId }, { _id: true })
  ]);

  const promiseQuestionDetails = questions.map((question) => {
    return getQuestionDetail(String(question._id));
  });

  const questionDetails = await Promise.all(promiseQuestionDetails);

  return { ...test, questions: questionDetails };
};

export const getTestsByLesson = async (lessonId: string) => {
  const [count, listTests] = await Promise.all([
    TestModel.find({ lessonId }).count(),
    TestModel.find({ lessonId }, { _id: true }).lean()
  ]);

  const listPromiseTestDetails = listTests.map((test) => {
    return getTestDetail(String(test._id));
  });

  const listTestDetails = await Promise.all(listPromiseTestDetails);
  const output = { count, tests: listTestDetails };

  return output;
};

export const deleteTestsByIds = async (testIds: string[]) => {
  const output = await TestModel.deleteMany({
    _id: { $in: testIds }
  }).lean();

  return output;
};

export const handleDeleteTests = async (testIds: string[]) => {
  const listQuestions = await getQuestionsByTests(testIds);

  const listQuestionIds = listQuestions.map((question) => String(question._id));

  const [deleteTest, deleteQuestion] = await Promise.all([
    deleteTestsByIds(testIds),
    handleDeleteManyQuestions(listQuestionIds)
  ]);

  const isDeleted = Boolean(deleteTest.deletedCount) && Boolean(deleteQuestion);

  return isDeleted;
};

import { Types } from "mongoose";
import { ObjectId, TestCreateBody } from "../../types";
import TestModel from "../../models/TestModel";
import QuestionModel from "../../models/QuestionModel";
import { getQuestionDetail, getQuestionsByTests, handleDeleteManyQuestions } from "./question";

export const checkExistedTest = async (testId: string) => {
  const isExisted = await TestModel.exists({
    _id: new ObjectId(testId)
  }).lean();
  return Boolean(isExisted);
};

export const createNewTest = async (test: TestCreateBody) => {
  const newTest = await TestModel.create({
    lessonId: new ObjectId(test.lessonId),
    timeLimit: test.timeLimit,
    description: test.description
  });
  return newTest;
};

export const updateExistedTest = async (testId: string, testInfo: TestCreateBody) => {
  const updatedTest = await TestModel.findOneAndUpdate({ _id: new ObjectId(testId) }, testInfo, {
    new: true
  }).lean();
  return updatedTest;
};

export const getTestDetail = async (testId: string) => {
  const [test, questions] = await Promise.all([
    TestModel.findOne(
      { _id: new ObjectId(testId) },
      {
        _id: true,
        timeLimit: true,
        score: true,
        createdAt: true,
        description: true
      }
    ).lean(),
    QuestionModel.find({ testId: new ObjectId(testId) }, { _id: true })
  ]);

  const promiseQuestionDetails = questions.map((question) => {
    return getQuestionDetail(String(question._id));
  });

  const questionDetails = await Promise.all(promiseQuestionDetails);

  return { ...test, questions: questionDetails };
};

export const getTestsByLesson = async (lessonId: string) => {
  const [count, listTests] = await Promise.all([
    TestModel.find({ lessonId: new ObjectId(lessonId) }).count(),
    TestModel.find({ lessonId: new ObjectId(lessonId) }, { _id: true }).lean()
  ]);

  const listPromiseTestDetails = listTests.map((test) => {
    return getTestDetail(String(test._id));
  });

  const listTestDetails = await Promise.all(listPromiseTestDetails);
  const output = { count, tests: listTestDetails };

  return output;
};

export const deleteTestsByIds = async (testIds: Types.ObjectId[]) => {
  const output: any = await TestModel.deleteMany({
    _id: { $in: testIds }
  }).lean();
  return output;
};

export const handleDeleteTests = async (testIds: Types.ObjectId[]) => {
  const listQuestions = await getQuestionsByTests(testIds);
  const listQuestionIds = listQuestions.map((question) => question._id);

  const [deleteTest, deleteQuestion] = await Promise.all([
    deleteTestsByIds(testIds),
    handleDeleteManyQuestions(listQuestionIds)
  ]);

  // const isDeleted = Boolean(deleteTest.deletedCount) && Boolean(deleteQuestion);
  const isDeleted = Boolean(deleteTest) && Boolean(deleteQuestion);
  return isDeleted;
};

export const updateTestScoreWhenCreateQuestion = async (
  testId: string,
  newQuestionScore: number
) => {
  const test = await TestModel.findOne({ _id: new ObjectId(testId) }).lean();
  // const newTestScore = test?.score + newQuestionScore;
  const newTestScore = 0;

  const updatedTest = await TestModel.findOneAndUpdate(
    { _id: new ObjectId(testId) },
    { score: newTestScore },
    { new: true }
  ).lean();

  return updatedTest;
};

export const updateTestScoreWhenUpdateQuestion = async (
  testId: string,
  questionId: string,
  newQuestionScore: number
) => {
  // 1. Get old test score and old question score
  const [test, question] = await Promise.all([
    TestModel.findOne({ _id: new ObjectId(testId) }).lean(),
    QuestionModel.findOne({
      _id: new ObjectId(questionId)
    }).lean()
  ]);

  const oldTestScore = test?.score;
  const oldQuestionScore = question?.score;

  // 2. Calculate new test score
  // const newTestScore = oldTestScore - oldQuestionScore + newQuestionScore;
  const newTestScore = 0;

  // 3. Update test score
  const updatedTest = await TestModel.findOneAndUpdate(
    { _id: new ObjectId(testId) },
    { score: newTestScore },
    { new: true }
  ).lean();

  return updatedTest;
};

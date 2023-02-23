import TestModel from "../../models/TestModel.js";
import QuestionModel from "../../models/QuestionModel.js";
import { getQuestionDetail } from "./question.js";

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

const getTestDetail = async (testId) => {
  const [test, questions] = await Promise.all([
    TestModel.findOne(
      { _id: testId },
      { _id: true, timeLimit: true, score: true, created: true }
    ).lean(),
    QuestionModel.find({ testId }, { _id: true })
  ]);

  const promiseQuestionDetails = questions.map((_id) => {
    return getQuestionDetail(_id);
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

export { createNewTest, checkExistedTestId, getTestDetail, getTestsByLesson };

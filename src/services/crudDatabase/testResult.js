import AnswerModel from "../../models/AnswerModel.js";
import TestResultModel from "../../models/TestResultModel.js";
import QuestionModel from "../../models/QuestionModel.js";
import TestModel from "../../models/TestModel.js";

const getAnswersOfQuestion = async (questionId) => {
  const answers = await AnswerModel.find(
    { questionId, isCorrect: true },
    { _id: true },
    { sort: { _id: 1 } }
  ).lean();

  const output = answers.map((answers) => answers._id.toString());
  return output;
};

const getScoreQuestion = async (questionId, answers) => {
  const questionDetail = await QuestionModel.findOne(
    { _id: questionId },
    { score: true }
  ).lean();

  const correctAnswer = await getAnswersOfQuestion(questionId);

  // Get a score by Comparing the array of correct answers with the array of user answers
  const score =
    JSON.stringify(correctAnswer) === JSON.stringify(answers)
      ? questionDetail.score
      : 0;

  return score;
};

const handleScore = async (results) => {
  const listScorePromise = results.map((result) => {
    const { questionId, answers } = result;
    return getScoreQuestion(questionId, answers.sort());
  });

  const listScore = await Promise.all(listScorePromise);
  const sumScore = listScore.reduce((a, b) => a + b, 0);

  return sumScore;
};

export const createTestResult = async ({ userId, testId, results }) => {
  const score = await handleScore(results);
  const testScore = await TestModel.findOne(
    { _id: testId },
    { score: true }
  ).lean();

  // Pass if the score obtained is greater than or equal to 70% of the total of the test
  const isPass = score / testScore.score >= 0.7 ? true : false;

  const newTestResult = new TestResultModel({
    userId,
    testId,
    score,
    isPass
  });
  const output = await newTestResult.save();

  return output;
};

export const checkDidTest = async ({ userId, testId }) => {
  const isExisted = await TestResultModel.findOne({ userId, testId }).lean();
  return Boolean(isExisted);
};

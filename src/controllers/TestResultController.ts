import {
  checkDidTest,
  createTestResult,
  getTestResult
} from "../services/crudDatabase/testResult";
import { checkExistedTest } from "../services/crudDatabase/test";
import { checkExistedUserId } from "../services/crudDatabase/user";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

const TestResultController = {
  getTestResult: catchAsync(async (req, res) => {
    const { userId, testId } = req.query;
    const testResult = await getTestResult(userId, testId);

    return res.json({
      status: "Success",
      error: null,
      data: testResult
    });
  }),

  submitTest: catchAsync(async (req, res, next) => {
    const { userId, testId, results } = req.body;

    const [isExistedUserId, isExistedTestId, isDidTest] = await Promise.all([
      checkExistedUserId(userId),
      checkExistedTest(testId),
      checkDidTest({ userId, testId })
    ]);

    if (isExistedUserId === false)
      return next(new AppError("User Id is not existed", 404));

    if (isExistedTestId === false)
      return next(new AppError("Test Id is not existed", 404));

    if (isDidTest)
      return next(new AppError("You have taken this test before", 400));

    const testResult = await createTestResult({ userId, testId, results });

    return res.json({
      status: "Success",
      error: null,
      data: testResult
    });
  })
};

export default TestResultController;

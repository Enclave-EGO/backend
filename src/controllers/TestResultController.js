import {
  checkDidTest,
  createTestResult
} from "../services/crudDatabase/testResult.js";
import { checkExistedTest } from "../services/crudDatabase/test.js";
import { checkExistedUserId } from "../services/crudDatabase/user.js";

const TestResultController = {
  submitTest: async (req, res) => {
    try {
      const { userId, testId, results } = req.body;

      const [isExistedUserId, isExistedTestId, isDidTest] = await Promise.all([
        checkExistedUserId(userId),
        checkExistedTest(testId),
        checkDidTest({ userId, testId })
      ]);

      if (isExistedUserId === false) {
        return res.status(404).json({
          message: "Fail",
          error: "User Id is not existed",
          data: null
        });
      }
      if (isExistedTestId === false) {
        return res.status(404).json({
          message: "Fail",
          error: "Test Id is not existed",
          data: null
        });
      }
      if (isDidTest) {
        return res.status(400).json({
          message: "Fail",
          error: "You have taken this test before.",
          data: null
        });
      }

      const testResult = await createTestResult({ userId, testId, results });
      if (testResult) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: testResult
        });
      } else {
        return res.status(400).json({
          status: "Fail",
          error: null,
          data: null
        });
      }
    } catch (result) {
      return res.status(400).json({
        status: "Fail",
        error: error,
        data: null
      });
    }
  }
};

export default TestResultController;
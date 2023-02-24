import { checkExistedLessonId } from "../services/crudDatabase/lesson.js";
import {
  checkExistedTestId,
  createNewTest,
  updateExistedTest
} from "../services/crudDatabase/test.js";
import {
  validateTest,
  validateUpdateTestOptional
} from "../validators/testValidator.js";

const TestController = {
  createTest: async (req, res) => {
    try {
      const { status, error } = await validateTest(req, res);
      const lessonId = req.body.lessonId;

      if (status === "Fail") {
        return res.status(400).json({
          status: "Fail",
          error: error,
          data: null
        });
      }

      const isExistedLessonId = await checkExistedLessonId(lessonId);
      if (isExistedLessonId === false) {
        return res.status(404).json({
          status: "Fail",
          error: "Lesson Id is not existed",
          data: null
        });
      }

      const test = await createNewTest(req.body);
      if (test) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: test
        });
      } else {
        return res.status(400).json({
          status: "Fail",
          error: null,
          data: null
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: "Fail",
        error: error,
        data: null
      });
    }
  },

  updateTest: async (req, res) => {
    try {
      const testId = req.params.id;

      const { status, error } = await validateUpdateTestOptional(req);
      if (status === "Fail") {
        return res.status(400).json({
          status: "Fail",
          error: error,
          data: null
        });
      }

      const isExistedTestId = await checkExistedTestId(testId);
      if (isExistedTestId === false) {
        return res.status(404).json({
          status: "Fail",
          error: "Test Id is not existed",
          data: null
        });
      }

      const test = await updateExistedTest(testId, req.body);
      if (test) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: test
        });
      } else {
        return res.status(400).json({
          status: "Fail",
          error: null,
          data: null
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: "Fail",
        error: error,
        data: null
      });
    }
  }
};

export default TestController;

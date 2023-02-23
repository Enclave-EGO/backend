import { checkExistedLessonId } from "../services/crudDatabase/lesson.js";
import { handleCreateNewTest } from "../services/crudDatabase/test.js";
import { validateTest } from "../validators/testValidator.js";

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
        return res.status(400).json({
          status: "Fail",
          error: "Lesson Id is not existed",
          data: null
        });
      }

      const test = await handleCreateNewTest(req.body);
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

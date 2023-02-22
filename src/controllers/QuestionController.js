import {
  checkExistedQuestionContent,
  handleCreateNewQuestion
} from "../services/crudDatabase/question.js";
import { checkExistedTestId } from "../services/crudDatabase/test.js";
import { validateCreateQuestion } from "../validators/questionValidator.js";

const QuestionController = {
  createQuestion: async (req, res) => {
    try {
      const { status, error } = await validateCreateQuestion(req);
      const { testId, content } = req.body;

      if (status === "Fail")
        return res.status(400).json({
          status: "Fail",
          error: error,
          data: null
        });

      const [isExistedTestId, isExistedQuestionContent] = await Promise.all([
        checkExistedTestId(testId),
        checkExistedQuestionContent(content)
      ]);
      if (isExistedTestId === false) {
        return res.status(400).json({
          status: "Fail",
          error: "Test ID is not existed",
          data: null
        });
      }
      if (isExistedQuestionContent) {
        return res.status(404).json({
          status: "Fail",
          error: "Question content is existed",
          data: null
        });
      }

      const course = await handleCreateNewQuestion(req.body);
      if (course) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: course
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

export default QuestionController;

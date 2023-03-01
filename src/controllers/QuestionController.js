import { checkExistedTest } from "../services/crudDatabase/test.js";
import {
  checkExistedQuestion,
  handleCreateNewQuestion,
  handleUpdateQuestion,
  handleDeleteQuestionById,
  handleDeleteManyQuestions,
  getQuestionDetail
} from "../services/crudDatabase/question.js";
import {
  validateCreateQuestion,
  validateUpdateQuestion
} from "../validators/questionValidator.js";

const QuestionController = {
  createQuestion: async (req, res) => {
    try {
      const { status, error } = await validateCreateQuestion(req);
      const testId = req.body.testId;

      if (status === "Fail")
        return res.status(400).json({
          status: "Fail",
          error: error,
          data: null
        });

      const isExistedTestId = await checkExistedTest(testId);
      if (isExistedTestId === false) {
        return res.status(400).json({
          status: "Fail",
          error: "Test ID is not existed",
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
  },

  updateQuestion: async (req, res) => {
    try {
      const questionId = req.params.questionId;
      const testId = req.body.testId;

      const { status, error } = await validateUpdateQuestion(req);
      if (status === "Fail")
        return res.status(400).json({
          status: "Fail",
          error: error,
          data: null
        });

      const isExistedTest = await checkExistedTestId(testId);
      if (isExistedTest === false) {
        return res.status(404).json({
          status: "Fail",
          error: "Test is not existed",
          data: null
        });
      }

      const isExistedQuestion = await checkExistedQuestion(questionId);
      if (isExistedQuestion === false) {
        return res.status(404).json({
          status: "Fail",
          error: "Question is not existed",
          data: null
        });
      }

      const question = await handleUpdateQuestion(questionId, req.body);
      if (question) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: question
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

  deleteQuestion: async (req, res) => {
    try {
      const questionId = req.params.questionId;
      const isDeleted = await handleDeleteQuestionById(questionId);

      if (isDeleted) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: isDeleted
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

  deleteQuestions: async (req, res) => {
    try {
      const questionIds = req.body.questionIds;
      const isDeleted = await handleDeleteManyQuestions(questionIds);

      if (isDeleted) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: isDeleted
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

  getQuestion: async (req, res) => {
    const questionId = req.params.questionId;

    try {
      const questionDetail = await getQuestionDetail(questionId);

      if (questionDetail) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: questionDetail
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

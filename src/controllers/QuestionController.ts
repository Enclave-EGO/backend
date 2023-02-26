import {
  checkExistedQuestion,
  handleCreateNewQuestion,
  handleUpdateQuestion,
  handleDeleteQuestionById,
  handleDeleteManyQuestions,
  getQuestionDetail
} from "../services/crudDatabase/question";
import { checkExistedTestId } from "../services/crudDatabase/test";
import {
  validateCreateQuestion,
  validateUpdateQuestion
} from "../validators/questionValidator";
import { Request, Response } from "express";

const QuestionController = {
  createQuestion: async (req: Request, res: Response) => {
    try {
      const { status, error } = await validateCreateQuestion(req);
      const testId = req.body.testId;

      if (status === "Fail")
        return res.status(400).json({
          status: "Fail",
          error: error,
          data: null
        });

      const isExistedTestId = await checkExistedTestId(testId);
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

  updateQuestion: async (req: Request, res: Response) => {
    try {
      const questionId = req.params.questionId;

      const { status, error } = await validateUpdateQuestion(req);
      if (status === "Fail")
        return res.status(400).json({
          status: "Fail",
          error: error,
          data: null
        });

      const isExistedQuestion = await checkExistedQuestion(questionId);
      if (isExistedQuestion === false) {
        return res.status(400).json({
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

  deleteQuestion: async (req: Request, res: Response) => {
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

  deleteQuestions: async (req: Request, res: Response) => {
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

  getQuestion: async (req: Request, res: Response) => {
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

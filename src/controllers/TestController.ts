import {
  createNewTest,
  getTestDetail,
  getTestsByLesson,
  handleDeleteTests,
  checkExistedTestId,
  updateExistedTest
} from "../services/crudDatabase/test";
import { checkExistedLessonId } from "../services/crudDatabase/lesson";
import {
  validateTest,
  validateUpdateTestOptional
} from "../validators/testValidator";
import { Request, Response } from "express";

const TestController = {
  createTest: async (req: Request, res: Response) => {
    try {
      const { status, error } = await validateTest(req);
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

  getTestsByLesson: async (req: Request, res: Response) => {
    const lessonId = req.query.lessonId;

    try {
      const listTests = await getTestsByLesson(String(lessonId));

      if (listTests) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: listTests
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

  getTestById: async (req: Request, res: Response) => {
    const testId = req.params.testId;

    try {
      const testDetail = await getTestDetail(testId);

      if (testDetail) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: testDetail
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

  updateTest: async (req: Request, res: Response) => {
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
  },
  deleteTest: async (req: Request, res: Response) => {
    const testId = req.params.testId;

    try {
      const deleteTestArray = [testId];
      const deleteInfo = await handleDeleteTests(deleteTestArray);

      if (deleteInfo) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: deleteInfo
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

  deleteManyTests: async (req: Request, res: Response) => {
    const testIds = req.body.testIds;

    try {
      const deleteInfo = await handleDeleteTests(testIds);

      if (deleteInfo) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: deleteInfo
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

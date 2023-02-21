import { checkExistedCourseId } from "../services/crudDatabase/course.js";
import {
  checkRegisterById,
  checkRegisteredCourse,
  deleteManyRegisters,
  registerCourse,
  deleteRegisterById
} from "../services/crudDatabase/register.js";

const RegisterController = {
  registerNewCourse: async (req, res) => {
    const { userId, courseId } = req.body;

    const isExistedCourse = await checkExistedCourseId(courseId);

    if (isExistedCourse === false) {
      return res.status(400).json({
        status: "Fail",
        error: "Course is not existed",
        data: null
      });
    }

    const newRegister = { userId, courseId };

    const isExistedRegister = await checkRegisteredCourse(newRegister);

    if (isExistedRegister)
      return res.status(400).json({
        status: "Fail",
        error: "You registered this course!",
        data: null
      });

    try {
      const output = await registerCourse(newRegister);

      return res.status(200).send({
        status: "Success",
        error: null,
        data: output
      });
    } catch (error) {
      return res.status(400).send({
        status: "Fail",
        error: error,
        data: null
      });
    }
  },

  deleteRegister: async (req, res) => {
    const registerId = req.params.registerId;
    const isExistedRegister = await checkRegisterById(registerId);

    if (isExistedRegister === false) {
      return res.status(400).json({
        status: "Fail",
        error: "Register isn't found",
        data: null
      });
    }

    try {
      const output = await deleteRegisterById(registerId);

      if (output) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: output
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

  deleteRegisters: async (req, res) => {
    const registerIds = req.body.registerIds;
    try {
      const output = await deleteManyRegisters(registerIds);
      const deleteCount = output.deletedCount;

      if (deleteCount) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: deleteCount
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

export default RegisterController;

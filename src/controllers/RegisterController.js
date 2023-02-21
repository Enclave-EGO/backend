import {
  checkExistedCourseId,
  deleteCourseById
} from "../services/crudDatabase/course.js";
import {
  checkRegisterById,
  checkRegisteredCourse,
  deleteManyRegisters,
  registerCourse
} from "../services/crudDatabase/register.js";

const RegisterController = {
  registerNewCourse: async (req, res) => {
    const { userId, courseId } = req.body;

    const isValidCourse = await checkExistedCourseId(courseId);

    if (isValidCourse === false) {
      return res.status(400).json({
        status: "Fail",
        error: "Course is invalid",
        data: null
      });
    }

    const newRegister = { userId, courseId };
    const isExisted = await checkRegisteredCourse(newRegister);

    if (isExisted)
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
    const registerId = req.param.registerId;
    const isExistedRegister = await checkRegisterById(registerId);

    if (isExistedRegister === false) {
      return res.status(400).json({
        status: "Fail",
        error: "Register isn't found",
        data: null
      });
    }

    try {
      console.log(registerId);
      const output = await deleteCourseById(registerId);

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

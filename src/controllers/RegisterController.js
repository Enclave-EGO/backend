import { checkExistedCourseId } from "../services/crudDatabase/course.js";
import {
  checkRegisteredCourse,
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
  }
};

export default RegisterController;

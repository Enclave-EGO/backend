import { checkExistedCourseId } from "../services/crudDatabase/course.js";
import {
  checkRegisteredCourse,
  registerCourse
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
  }
};

export default RegisterController;

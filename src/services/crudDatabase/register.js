import RegisterModel from "../../models/RegisterModel.js";

export const checkRegisteredCourse = async (registerForm) => {
  const { userId, courseId } = registerForm;
  const isRegisteredCourse = await RegisterModel.findOne({ userId, courseId });

  return Boolean(isRegisteredCourse);
};

export const registerCourse = async (registerForm) => {
  const { userId, courseId } = registerForm;

  const newCourse = new RegisterModel({
    userId,
    courseId
  });

  const output = await newCourse.save();

  return output;
};

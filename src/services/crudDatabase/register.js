import RegisterModel from "../../models/RegisterModel.js";

export const checkRegisteredCourse = async (registerForm) => {
  const { userId, courseId } = registerForm;
  const isRegisteredCourse = await RegisterModel.findOne({ userId, courseId });

  return Boolean(isRegisteredCourse);
};

export const checkRegisterById = async (registerId) => {
  const output = await RegisterModel.findOne({ _id: registerId });
  return Boolean(output);
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

export const deleteRegisterById = async (registerId) => {
  const output = await RegisterModel.findOneAndDelete({
    _id: registerId
  }).lean();
  return output;
};

export const deleteManyRegisters = async (registerIds) => {
  const output = await RegisterModel.deleteMany({
    _id: { $in: registerIds }
  }).lean();

  return output;
};

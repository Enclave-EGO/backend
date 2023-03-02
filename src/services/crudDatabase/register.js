import RegisterModel from "../../models/RegisterModel.js";
import { ObjectId } from "../../constants/index.js";

export const checkRegisteredCourse = async (registerForm) => {
  const { userId, courseId } = registerForm;
  
  const isRegisteredCourse = await RegisterModel.findOne({
    userId: new ObjectId(userId),
    courseId: new ObjectId(courseId)
  });

  return Boolean(isRegisteredCourse);
};

export const checkRegisterById = async (registerId) => {
  const output = await RegisterModel.findOne({ _id: new ObjectId(registerId) });
  return Boolean(output);
};

export const registerCourse = async (registerForm) => {
  const { userId, courseId } = registerForm;

  const newCourse = new RegisterModel({
    userId: new ObjectId(userId),
    courseId: new ObjectId(courseId)
  });

  const output = await newCourse.save();
  return output;
};

export const deleteRegisterById = async (registerId) => {
  const output = await RegisterModel.findOneAndDelete({
    _id: new ObjectId(registerId)
  }).lean();
  return output;
};

export const deleteManyRegisters = async (registerIds) => {
  const output = await RegisterModel.deleteMany({
    _id: { $in: registerIds }
  }).lean();

  return output;
};

import { ObjectId } from "~/types";
import RegisterModel from "~/models/RegisterModel";
import CourseModel from "~/models/CourseModel";
import { Types } from "mongoose";

export const checkRegisteredCourse = async (registerForm) => {
  const { userId, courseId } = registerForm;

  const isRegisteredCourse = await RegisterModel.findOne({
    userId: new ObjectId(userId),
    courseId: new ObjectId(courseId)
  });

  return Boolean(isRegisteredCourse);
};

export const checkRegisterById = async (registerId: string) => {
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

export const deleteRegisterById = async (registerId: string) => {
  const output = await RegisterModel.findOneAndDelete({
    _id: new ObjectId(registerId)
  }).lean();
  return output;
};

export const deleteManyRegisters = async (registerIds: Types.ObjectId[]) => {
  const output = await RegisterModel.deleteMany({
    _id: { $in: registerIds }
  }).lean();
  return output;
};

export const getRegisterByUserAndCourse = async ({ userId, courseId }) => {
  const register = await RegisterModel.findOne({
    userId: new ObjectId(userId),
    courseId: new ObjectId(courseId)
  });
  return register;
};

export const getRegisteredCoursesByUser = async (userId: string) => {
  const registeredCourses = await RegisterModel.find({
    userId: new ObjectId(userId)
  });

  // get all registered courses
  const coursesId = registeredCourses.map((course) => course.courseId);
  const courses = await CourseModel.find({
    _id: { $in: coursesId }
  });

  return courses;
};

export const getNotRegisteredCoursesByUser = async (userId: string) => {
  const registeredCourses = await RegisterModel.find({
    userId: new ObjectId(userId)
  });

  // get all registered courses
  const coursesId = registeredCourses.map((course) => course.courseId);
  const courses = await CourseModel.find({
    _id: { $nin: coursesId }
  });

  return courses;
};

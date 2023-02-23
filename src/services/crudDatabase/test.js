import mongoose from "mongoose";
import TestModel from "../../models/TestModel.js";

export const checkExistedTestId = async (testId) => {
  const isExisted = await TestModel.exists({
    _id: new mongoose.Types.ObjectId(testId)
  }).lean();

  return Boolean(isExisted);
};

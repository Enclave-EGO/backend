import TestModel from "../../models/TestModel.js";

const checkExistedTestId = async (testId) => {
  const isExisted = await TestModel.exists({
    _id: new mongoose.Types.ObjectId(testId)
  }).lean();

  return Boolean(isExisted);
};
const handleCreateNewTest = async (test) => {
  const newTest = await TestModel.create(test);
  return newTest;
};

export { handleCreateNewTest, checkExistedTestId };

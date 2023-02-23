import TestModel from "../../models/TestModel.js";

const handleCreateNewTest = async (test) => {
  const newTest = await TestModel.create(test);
  return newTest;
};

export { handleCreateNewTest };

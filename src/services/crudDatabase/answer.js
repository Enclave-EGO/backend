import mongoose from "mongoose";
import AnswerModel from "../../models/AnswerModel.js";

export const createNewAnswer = async (answer) => {
  const newAnswer = await AnswerModel.create(answer);
  return newAnswer;
};

export const handleCreateNewAnswers = async (questionId, answers) => {
  const promises = answers.map((answer) => {
    const newAnswer = {
      questionId: new mongoose.Types.ObjectId(questionId),
      content: answer.content,
      isCorrect: answer.isCorrect,
      numericalOrder: answer.numericalOrder
    };
    return createNewAnswer(newAnswer);
  });

  const resultArray = await Promise.all(promises);
  return resultArray;
};

export const updateAnswer = async (questionId, numericalOrder, answerInfo) => {
  const updatedAnswer = await AnswerModel.findOneAndUpdate(
    { questionId, numericalOrder },
    answerInfo
  );

  return updatedAnswer;
};

export const handleUpdateAnswers = async (questionId, answers) => {
  const promises = answers.map((answer) => {
    const numericalOrder = answer.numericalOrder;

    const answerInfo = {
      content: answer.content,
      isCorrect: answer.isCorrect
    };

    return updateAnswer(questionId, numericalOrder, answerInfo);
  });

  const resultArray = await Promise.all(promises);
  return resultArray;
};

export const deleteAnswersOfQuestion = async (questionId) => {
  const deletedInfo = await AnswerModel.deleteMany({
    questionId: new mongoose.Types.ObjectId(questionId)
  }).lean();

  return deletedInfo;
};

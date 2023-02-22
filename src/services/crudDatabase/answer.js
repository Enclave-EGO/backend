import mongoose from "mongoose";
import AnswerModel from "../../models/AnswerModel.js";

export const createNewAnswer = async (answer) => {
  const newAnswer = await AnswerModel.create(answer);
  return newAnswer;
};

export const handleCreateNewAnswers = async (questionId, answers) => {
  // below promises is an array of promises
  const promises = answers.map(async (answer) => {
    const newAnswer = {
      questionId: new mongoose.Types.ObjectId(questionId),
      content: answer.content,
      isCorrect: answer.isCorrect
    };
    return createNewAnswer(newAnswer);
  });

  const resultArray = await Promise.all(promises);
  return resultArray;
};

import mongoose from "mongoose";
import AnswerModel from "../../models/AnswerModel.js";

export const createNewAnswer = async (answer) => {
  const newAnswer = await AnswerModel.create(answer).lean();
  return newAnswer;
};

export const handleCreateNewAnswers = async (questionId, answers) => {
  const promises = answers.map((answer) => {
    const newAnswer = {
      questionId: new mongoose.Types.ObjectId(questionId),
      content: answer.content,
      isCorrect: answer.isCorrect
    };
    return createNewAnswer(newAnswer);
  });

  await Promise.all(promises);
};

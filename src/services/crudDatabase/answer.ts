import AnswerModel from "~/models/AnswerModel";
import { AnswerUpdate, NewAnswer, ObjectId } from "~/types";

export const createNewAnswer = async (answer: NewAnswer) => {
  const newAnswer = await AnswerModel.create(answer);
  return newAnswer;
};

export const handleCreateNewAnswers = async (questionId: string, answers: NewAnswer[]) => {
  const promises = answers.map((answer) => {
    const newAnswer: NewAnswer = {
      questionId: new ObjectId(questionId),
      content: answer.content,
      isCorrect: answer.isCorrect
    };
    return createNewAnswer(newAnswer);
  });

  const resultArray = await Promise.all(promises);
  return resultArray;
};

export const updateAnswer = async (answerId: string, answerInfo: NewAnswer) => {
  const updatedAnswer = await AnswerModel.findOneAndUpdate(
    { _id: new ObjectId(answerId) },
    answerInfo,
    { new: true }
  );
  return updatedAnswer;
};

export const handleUpdateAnswers = async (answers: AnswerUpdate[]) => {
  const promises = answers.map((answer) => {
    const answerId = String(answer.answerId);
    const answerInfo = {
      content: answer.content,
      isCorrect: answer.isCorrect
    };
    return updateAnswer(answerId, answerInfo);
  });

  const resultArray = await Promise.all(promises);
  return resultArray;
};

export const deleteAnswersOfQuestion = async (questionId: string) => {
  const deletedInfo = await AnswerModel.deleteMany({
    questionId: new ObjectId(questionId)
  }).lean();
  return deletedInfo;
};

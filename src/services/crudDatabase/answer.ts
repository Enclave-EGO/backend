import AnswerModel from "../../models/AnswerModel";
import { InputAnswer, InputAnswerForUpdate } from "../../types";
import { ObjectId } from "../../constants";

export const createNewAnswer = async (answer: object) => {
  const newAnswer = await AnswerModel.create(answer);
  return newAnswer;
};

export const handleCreateNewAnswers = async (
  questionId: string,
  answers: InputAnswer[]
) => {
  const promises = answers?.map((answer) => {
    const newAnswer = {
      questionId: questionId,
      content: answer?.content,
      isCorrect: answer?.isCorrect
    };
    return createNewAnswer(newAnswer);
  });

  const resultArray = await Promise.all(promises);
  return resultArray;
};

export const updateAnswer = async (answerId: string, answerInfo: object) => {
  const updatedAnswer = await AnswerModel.findOneAndUpdate(
    { _id: new ObjectId(answerId) },
    answerInfo
  );

  return updatedAnswer;
};

export const handleUpdateAnswers = async (answers: InputAnswerForUpdate[]) => {
  const promises = answers.map((answer) => {
    const answerId = answer.answerId;

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

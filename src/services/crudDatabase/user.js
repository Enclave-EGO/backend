import { hashPassword } from "../authentication/index.js";
import UserModel from "../../models/UserModel.js";

export const checkExistedUsername = async (username) => {
  const user = await UserModel.findOne({ username });
  return Boolean(user);
};

export const checkExistedEmail = async (email) => {
  const user = await UserModel.findOne({ email });
  return Boolean(user);
};

export const createNewUser = async (user) => {
  const { password, username, ...data } = user;

  const passwordHash = await hashPassword(password);

  const newUser = new UserModel({
    password: passwordHash,
    username: username,
    ...data
  });
  const output = await newUser
    .save()
    .then((user) => {
      return {
        _id: user._id,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt
      };
    })
    .catch((error) => error);

  return output;
};

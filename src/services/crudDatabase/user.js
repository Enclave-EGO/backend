import UserModel from "../../models/UserModel.js";
import {
  generateAccessToken,
  hashPassword,
  comparePassword
} from "../authentication/index.js";

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

export const checkUserSignIn = async (user) => {
  const existUser = await UserModel.findOne({ username: user.username }).lean();

  if (existUser) {
    const { password, ...data } = existUser;

    const isCorrectPassword = await comparePassword(user.password, password);

    if (isCorrectPassword) {
      const payload = { _id: data._id, role: data.role };
      const token = await generateAccessToken(payload);

      return { _id: data._id, token: token };
    }
  }

  return null;
};

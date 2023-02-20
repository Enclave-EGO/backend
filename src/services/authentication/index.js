import { EXPIRES_IN, JWT_SECRET_KEY } from "../../constants/index.js";
import jwt from "jsonwebtoken";
import pkg from "bcryptjs";
const { hashSync, compareSync, genSaltSync } = pkg;

export const generateAccessToken = async (payload) => {
  const expiresIn = EXPIRES_IN + `m`;
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn });

  return token;
};

export const hashPassword = async (password, salt = 10) => {
  return hashSync(password, genSaltSync(salt));
};

export const comparePassword = async (password, passwordHash) => {
  return compareSync(password, passwordHash);
};

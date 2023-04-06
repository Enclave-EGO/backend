import jwt from "jsonwebtoken";
import pkg from "bcryptjs";
import { EXPIRES_IN, JWT_SECRET_KEY } from "~/constants";
import { TokenPayload } from "~/types";
const { hashSync, compareSync, genSaltSync } = pkg;

export const generateAccessToken = async (payload: TokenPayload) => {
  const expiresIn = EXPIRES_IN + `m`;
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn });
  return token;
};

export const hashPassword = async (password: string, salt = 10) => {
  return hashSync(password, genSaltSync(salt));
};

export const comparePassword = async (password: string, passwordHash: string) => {
  return compareSync(password, passwordHash);
};

export const decodeToken = (token: string) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

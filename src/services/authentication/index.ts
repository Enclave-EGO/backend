import jwt from "jsonwebtoken";
import pkg from "bcryptjs";
const { hashSync, compareSync, genSaltSync } = pkg;
import { EXPIRES_IN, JWT_SECRET_KEY } from "../../constants";
import { UserPayload } from "../../types";

export const generateAccessToken = async (payload: UserPayload) => {
  const expiresIn = EXPIRES_IN + `m`;
  const token = jwt.sign(payload, JWT_SECRET_KEY as string, { expiresIn });
  return token;
};

export const hashPassword = async (password: string, salt: number = 10) => {
  return hashSync(password, genSaltSync(salt));
};

export const comparePassword = async (
  password: string,
  passwordHash: string
) => {
  return compareSync(password, passwordHash);
};

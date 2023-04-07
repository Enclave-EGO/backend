import { Request, Response, NextFunction } from "express";
import {
  checkExistedEmail,
  checkExistedUsername,
  createNewUser,
  checkUserSignIn,
  checkValidToken
} from "../services/crudDatabase/user";
import { generateAccessToken } from "../services/authentication";
import { validateUser, validateSignIn } from "../validators/userValidator";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

const UserController = {
  createUser: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { status, error } = await validateUser(req);
    if (status === "Fail") return next(new AppError(error, 400));

    const { password, username, name, email, role } = req.body;
    const [isExistedUsername, isExistedEmail] = await Promise.all([
      checkExistedUsername(username),
      checkExistedEmail(email)
    ]);

    const isExistedUser = isExistedEmail || isExistedUsername;
    if (isExistedUser) return next(new AppError("Username or Email is existed", 400));

    const newUser = {
      password,
      username,
      name,
      email,
      role
    };

    const output = await createNewUser(newUser);
    const payload = { _id: output._id, role: role };
    const token = await generateAccessToken(payload);

    return res.json({
      status: "Success",
      error: null,
      data: { ...output, token }
    });
  }),

  signIn: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { status, error } = await validateSignIn(req);
    if (status === "Fail") return next(new AppError(error, 400));

    const { username, password } = req.body;
    const user = { username, password };

    const output = await checkUserSignIn(user);
    if (output === null) {
      return res.json({
        status: "Fail",
        error: "Wrong Username Or Password",
        data: output
      });
    } else {
      return res.json({
        status: "Success",
        error: null,
        data: output
      });
    }
  }),

  checkValidToken: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token;
    const isValidToken = await checkValidToken(token);
    return res.json({
      status: "Success",
      error: null,
      data: isValidToken
    });
  })
};

export default UserController;
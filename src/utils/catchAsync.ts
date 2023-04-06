import { RequestMiddleware } from "~/types";

const catchAsync = (fn) => {
  return ({ req, res, next }: RequestMiddleware) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;

import { RequestMiddleware } from "~/types";

// Check if the user's role is allowed
// permittedRoles: permitted roles array
export const Roles = (...permittedRoles: number[]) => {
  return ({ req, res, next }: RequestMiddleware) => {
    if (permittedRoles.length === 0) next();

    const user = req.user;

    // if (user && permittedRoles.includes(user.role)) {
    if (user && permittedRoles.includes(1)) {
      next();
    } else {
      return res.status(403).json({
        status: "Fail",
        error: "Forbidden",
        data: null
      });
    }
  };
};

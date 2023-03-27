import { Roles } from "../../../middlewares/authentication/roleGuard";

describe("Roles", () => {
  test("should call next function if permitted roles are empty", () => {
    const req = {};
    const res = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };
    const next = jest.fn();

    Roles()(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("should call next function if user role is permitted", () => {
    const req = { user: { role: "admin" } };
    const res = {};
    const next = jest.fn();

    Roles("admin", "user")(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("should return 403 error if user role is not permitted", () => {
    const req = { user: { role: "guest" } };
    const res = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };
    const next = jest.fn();

    Roles("admin", "user")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);

    expect(res.status().json).toHaveBeenCalledWith({
      status: "Fail",
      error: "Forbidden",
      data: null
    });

    expect(next).not.toHaveBeenCalled();
  });
});

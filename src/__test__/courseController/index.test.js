// Hlep me correct this code please

import CourseController from "../../controllers/CourseController";
import {
  checkExistedCourseName,
  createNewCourse
} from "../../services/crudDatabase/course";
import { checkExistedUserId } from "../../services/crudDatabase/user";

jest.mock("../../services/crudDatabase/course");
jest.mock("../../services/crudDatabase/user");

describe("courseController", () => {
  it("should return error if validation fails", async () => {
    const req = {
      body: {
        name: "abcefrfg",
        userId: "63f208ab4c52335ac1ec1fe1",
        cost: 1000,
        description: "description",
        thumbnail:
          "https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png"
      }
    };

    const res = {
      json: jest.fn()
    };
    const next = jest.fn();

    checkExistedCourseName.mockResolvedValueOnce(true);
    checkExistedUserId.mockResolvedValueOnce(true);
    await CourseController.createCourse(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  it("should return value", async () => {
    const req = {
      body: {
        name: "abcefrfg",
        userId: "63f208ab4c52335ac1ec1fe1",
        cost: 1000,
        description: "description",
        thumbnail:
          "https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png"
      }
    };
    const res = {
      json: jest.fn()
    };
    const next = jest.fn();

    checkExistedCourseName.mockResolvedValueOnce(false);
    checkExistedUserId.mockResolvedValueOnce(true);
    createNewCourse.mockResolvedValueOnce({ data: "value" });
    await CourseController.createCourse(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      status: "Success",
      error: null,
      data: { data: "value" }
    });
  });
});

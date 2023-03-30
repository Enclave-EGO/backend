import { validateCourse } from "../../validators/courseValidator";

describe("Course validation", () => {
  test("should throws an error when userId is missing", async () => {
    const req = {
      body: {}
    };

    const rs = await validateCourse(req);

    await expect(rs).toEqual({
      error: "Course userId is required",
      status: "Fail"
    });
  });

  test("should throws an error when userId is not correct", async () => {
    const req = {
      body: { userId: "This is name" }
    };

    const rs = await validateCourse(req);

    await expect(rs).toEqual({
      error: "Course userId must include 24 characters",
      status: "Fail"
    });
  });
});

import { body, validationResult } from "express-validator";

const validateNameLesson = async (req) => {
	await body("name")
		.trim()
		.notEmpty()
		.withMessage("Name lesson required")
		.isLength({ min: 10, max: 100 })
		.withMessage("Name lesson must from 10 to 100 characters")
		.run(req);
};

const validateVideoID = async (req) => {
	await body("videoId")
		.trim()
		.notEmpty()
		.withMessage("Video id required")
		.isLength(11)
		.withMessage("video id invalid")
		.run(req);
};

const returnValidationResult = (req) => {
	const errors = validationResult(req);
	return {
		status: errors.isEmpty() ? "successfully" : "failed",
		error: errors.array()[0]?.msg
	};
};

export { validateNameLesson, validateVideoID, returnValidationResult };

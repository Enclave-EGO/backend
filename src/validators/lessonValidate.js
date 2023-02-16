import {
	returnValidationResult,
	validateNameLesson,
	validateVideoID
} from "./index.js";

const validateLesson = async (req, res) => {
	await validateNameLesson(req);
	await validateVideoID(req);
	return returnValidationResult(req);
};

export { validateLesson };


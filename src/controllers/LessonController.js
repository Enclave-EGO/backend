import Lesson from "../models/LessonModel.js";
import {
	checkExistedLessonName,
	checkExistedVideoID
} from "../services/crudDatabase/lesson.js";
import { validateLesson } from "../validators/lessonValidate.js";
import { createNewLesson } from "../services/crudDatabase/lesson.js";

const LessonController = {
	//[Post] add a lesson
	createLesson: async (req, res) => {
		const { status, error } = await validateLesson(req, res);
		const { name, description, videoId, courseId } = req.body;

		if (status === "failed")
			return res.status(400).json({
				message: error,
				error: error
			});

		const isExistedName = await checkExistedLessonName(name);
		const isExistedVideoId = await checkExistedVideoID(videoId);
		if (isExistedName || isExistedVideoId) {
			return res.status(404).json({
				message: "Name lesson or Video ID existed",
				error: "Name lesson or Video ID existed"
			});
		}
		try {
			const newLesson = { name, description, videoId, courseId };
			const saveLesson = await createNewLesson(newLesson);
			res.status(200).json(saveLesson);
		} catch (err) {
			res.status(500).json(err);
		}
	}
};

export default LessonController;

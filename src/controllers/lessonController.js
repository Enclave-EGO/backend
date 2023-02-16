import { Lesson } from "../models/lessonmodel.js";

const lessonController = {
    
    //[Post] add a lesson
    createLesson: async (req, res) => {
        try {
            const newLesson = new Lesson(req.body);
            const saveLesson = await newLesson.save();
            res.status(200).json(saveLesson);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export default lessonController;
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const lessonSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            // required: true,
        },
        videoId: {
            type: String,
            required: true,
        },
        courseId: {
            type: ObjectId,
            ref: "Course",
        },
    },
    { timestamps: true }
);

export const Lesson = mongoose.model("Lesson", lessonSchema);

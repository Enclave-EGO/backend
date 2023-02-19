import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		cost: {
			type: Number
		},
		description: {
			type: String
		},
		thumbnail: {
			type: String
		},
		userId: {
			type: String,
			ref: "User"
		}
	},
	{ timestamps: true }
);

const CourseModel = mongoose.model("Course", courseSchema);

export default CourseModel;

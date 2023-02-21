import express from "express";
import RegisterController from "../controllers/RegisterController.js";
const router = express.Router();

router.post("/", RegisterController.registerNewCourse);

export default router;

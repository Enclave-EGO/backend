import express from "express";
import TestResultController from "../controllers/TestResultController.js";
const router = express.Router();

router.post("/", TestResultController.submitTest);

export default router;

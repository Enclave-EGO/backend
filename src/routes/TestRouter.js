import express from "express";
import TestController from "../controllers/TestController.js";

const router = express.Router();

router.post("/", TestController.createTest);
router.patch("/:id", TestController.updateTest);

export default router;

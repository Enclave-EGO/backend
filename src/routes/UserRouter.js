import express from "express";
const router = express.Router();
import UserController from "../controllers/UserController.js";

router.get("/profile", UserController.getUserProfile);

export default router;

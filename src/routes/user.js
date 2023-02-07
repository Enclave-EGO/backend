import express from "express";
const router = express.Router();
import UserController from "../controllers/User.js";

router.get("/profile", UserController.getUserProfile);

export default router;

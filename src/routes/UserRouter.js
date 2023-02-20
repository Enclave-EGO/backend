import express from "express";
const router = express.Router();
import UserController from "../controllers/UserController.js";

router.post("/sign-up", UserController.createUser);

export default router;

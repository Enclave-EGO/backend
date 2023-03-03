import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.post("/", UserController.createUser);
router.post("/signin", UserController.signIn);

export default router;

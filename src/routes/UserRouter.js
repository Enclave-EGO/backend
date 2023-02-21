import express from "express";
const router = express.Router();
import UserController from "../controllers/UserController.js";

router.post("/", UserController.createUser);
router.post("/signin", UserController.signIn);

export default router;

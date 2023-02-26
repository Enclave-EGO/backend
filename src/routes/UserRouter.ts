import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/", UserController.createUser);
router.post("/signin", UserController.signIn);

export default router;

import express from "express";
import RegisterController from "../controllers/RegisterController.js";
const router = express.Router();

router.post("/", RegisterController.registerNewCourse);
router.delete("/:registerId", RegisterController.deleteRegister);
router.delete("/", RegisterController.deleteRegisters);

export default router;

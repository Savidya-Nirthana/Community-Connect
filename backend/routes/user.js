import express from "express";
import { checkEmail, createOtp, register } from "../controllers/userController.js";

const router = express.Router();

router.post("/checkEmail", checkEmail);
router.post("/register", register);
router.post("/otpReq", createOtp);

export default router;

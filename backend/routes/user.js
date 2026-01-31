import express from "express";
import {
  checkEmail,
  createOtp,
  getUser,
  logOut,
  register,
  validateOtp,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/checkEmail", checkEmail);
router.post("/registerUser", register);
router.post("/otpReq", createOtp);
router.post("/otpSend", validateOtp);

router.post("/getData", protect, getUser);
router.post("/logOut", protect, logOut);

export default router;

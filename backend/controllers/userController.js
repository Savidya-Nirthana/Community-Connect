import asyncHandler from "express-async-handler";
import users from "../models/user.model.js";
import nodemailer from "nodemailer";

export const checkEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const findUser = await users.findOne({ email: email });
  if (findUser) {
    return res.status(200).json({ message: "email found" });
  }
  return res.status(200).json({ message: "email not found" });
});

export const createOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await users.findOne({ email: email });
  const isOldUser = user ? true : false;

  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpires = Date.now() + 5 * 60 * 1000;

  await users.findOneAndUpdate(
    { email },
    {
      otp: otp,
      otpExpires: otpExpires,
    }
  );
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "Community Connect",
    to: email,
    subject: "Your OTP Code",
    html: `<h2>Your OTP is:</h2><h1>${otp}</h1><p>Valid for 5 minutes.</p>`,
  });

  return res.json({ message: "OTP sent", isOldUser: isOldUser });
});

export const register = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const findUser = await users.findOne({ email: email });
  if (!findUser) {
    const user = await users.create({
      email: email,
      name: name,
      password: password,
    });

    return res.status(200).json({ message: "User create successfully" });
  }
  res.status(400);
  throw new Error("User already exists");
});

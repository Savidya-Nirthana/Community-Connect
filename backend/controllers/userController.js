import asyncHandler from "express-async-handler";
import users from "../models/user.model.js";
import nodemailer from "nodemailer";
import genarateToken from "../utils/generateToken.js";

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

  if (isOldUser) {
    await users.findOneAndUpdate(
      { email },
      {
        otp: otp,
        otpExpires: otpExpires,
      }
    );
  } else {
    await users.create({
      email: email,
      otp: otp,
      otpExpires: otpExpires,
    });
  }
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

export const validateOtp = asyncHandler(async (req, res) => {
  const { otp, email, isOldEmail } = req.body;
  const user = await users.findOne({ email: email });

  if (Date.now() > user.otpExpires) {
    return res.status(401).json({ message: "Otp expired" });
  } else {
    if (user.otp == otp) {
      if (isOldEmail) {
        const token = await genarateToken(res, {
          email: email,
          role: user.role,
        });
      }
      return res.status(200).json({ message: "Otp verified" });
    } else {
      return res.status(401).json({ message: "Otp verification failed" });
    }
  }
});

export const register = asyncHandler(async (req, res) => {
  const { email, firstname, lastname, dob, occupation } = req.body;
  const findUser = await users.findOne({ email: email });

  if (!findUser) {
    throw new Error("Error happening please try again");
  }
  findUser.firstname = firstname;
  findUser.lastname = lastname;
  findUser.dob = dob;
  findUser.occupation = occupation;

  await findUser.save();
  const token = await genarateToken(res, {
    email: email,
    role: findUser.role,
  });

  return res.status(200).json({ message: "User create successfully" });
});

export const getUser = asyncHandler((req, res) => {
  return res.status(200).json({
    message: "user verified",
    email: res.user.user.email,
    role: res.user.user.role,
  });
});

export const logOut = asyncHandler((req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ message: `logout succesfull` });
});

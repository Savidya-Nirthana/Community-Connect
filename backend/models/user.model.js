import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
      default: "temperary",
    },
    lastname: {
      type: String,
      required: true,
      default: "temperary",
    },
    dob: {
      type: Date,
    },
    occupation: {
      type: String,
    },

    role: {
      type: String,
      default: "user",
      required: true,
      enum: ["admin", "user"],
    },

    otp: Number,
    otpExpires: Date,
  },
  { timestamps: true }
);

const users = mongoose.model("User", userSchema);
export default users;

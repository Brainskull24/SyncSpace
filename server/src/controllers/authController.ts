import { Request, Response } from "express";
import User from "../models/userModel";
import JWT from "jsonwebtoken";

const verificationCodes: Record<string, string> = {};

export const checkEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const existing = await User.findOne({ email });
  return res.json({ exists: !!existing });
};

export const sendCode = async (req: Request, res: Response) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  verificationCodes[email] = code;
  // TODO: send email logic here (nodemailer / SendGrid etc.)
  console.log(`Verification code for ${email}: ${code}`);
  return res.json({ success: true, message: "Verification code sent" });
};

export const verifyCode = (req: Request, res: Response) => {
  const { email, code } = req.body;
  if (verificationCodes[email] === code) {
    delete verificationCodes[email];
    return res.json({ success: true, message: "Email verified" });
  }
  return res.status(400).json({ success: false, message: "Invalid code" });
};

export const registerUser = async (req: Request, res: Response) => {
  const {
    email,
    password,
    universityId,
    firstName,
    lastName,
    phoneNumber,
    countryCode,
    academicYear,
    department,
    role,
    studentId,
    employeeId,
    adminPosition,
    graduationYear,
    profilePicture,
    isTeamLead,
  } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res
      .status(400)
      .json({ success: false, message: "Email already registered" });
  }

  const user = new User({
    email,
    password,
    universityId,
    firstName,
    lastName,
    phoneNumber,
    countryCode,
    academicYear,
    department,
    role,
    studentId,
    employeeId,
    adminPosition,
    graduationYear,
    profilePicture,
    isTeamLead,
  });

  await user.save();
  return res.json({ success: true, message: "Registration successful" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "User doesn't exists" });
  }
  const isMatch = password === user.password;
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }

  if (!process.env.JWT_SECRET) {
    return res
      .status(500)
      .json({ success: false, message: "JWT secret is not configured" });
  }
  const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  if (!token) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to generate token" });
  }

  user.token = token;

  return res.json({
    success: true,
    user: {
      id: user._id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
      university: user.universityId,
    },
    token,
  });
};

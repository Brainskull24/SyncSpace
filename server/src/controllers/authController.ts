import { Request, Response } from "express";
import User from "../models/userModel";
import JWT from "jsonwebtoken";
import { sendEmail } from "../middlewares/email";
import { z } from "zod";
import { getVerificationEmailHtml } from "../utils/emailTemplates";

const verificationCodes: Record<string, string> = {};

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const verifyResetCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(6),
});

export const checkEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const existing = await User.findOne({ email });
  return res.json({ exists: !!existing });
};

export const sendCode = async (req: Request, res: Response) => {
  const { email, name } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  verificationCodes[email] = code;
  const html = getVerificationEmailHtml(name, code);

  await sendEmail(email, "Verify Email Address", html);
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
  const { email, password, rememberMe } = req.body;

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
  await user.save();

  res.cookie("syncspace_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : undefined,
  });

  return res.json({
    success: true,
    user: {
      id: user._id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
      university: user.universityId,
    },
  });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("syncspace_token");
  return res.json({ success: true, message: "Logged out" });
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select("-password -token");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      user,
    });
  } catch {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const updates = req.body;
    Object.assign(user, updates);
    await user.save();

    return res.json({
      success: true,
      user: { ...user.toObject(), password: undefined, token: undefined },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const parsed = forgotPasswordSchema.safeParse(req.body);
  if (!parsed.success)
    return res
      .status(400)
      .json({ success: false, error: "Invalid email format" });

  const { email } = parsed.data;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ success: false, error: "User not found" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  verificationCodes[email] = code;

  await sendEmail(
    email,
    "Your Reset Code",
    `Your verification code is: ${code}`
  );

  return res.json({ success: true });
};

export const verifyResetCode = async (req: Request, res: Response) => {
  const parsed = verifyResetCodeSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ success: false, error: "Invalid input" });

  const { email, code } = parsed.data;
  const storedCode = verificationCodes[email];
  if (storedCode !== code)
    return res.status(401).json({ success: false, error: "Invalid code" });

  const token = JWT.sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });
  delete verificationCodes[email];

  return res.json({ success: true, token });
};

export const resetPassword = async (req: Request, res: Response) => {
  const parsed = resetPasswordSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ success: false, error: "Invalid input" });

  const { token, password } = parsed.data;

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET!) as {
      email: string;
    };
    const user = await User.findOne({ email: payload.email });
    if (!user)
      return res.status(404).json({ success: false, error: "User not found" });
    user.password = password;
    await user.save();
    return res.json({ success: true });
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, error: "Token expired or invalid" });
  }
};

export const requestDeleteAccount = async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  return res.json({
    success: true,
    message: "Account deletion requested. Please check your email.",
  });
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await User.find({})
      .select("-profilePicture -password -token")
      .where("role")
      .equals("student")
      .sort({ createdAt: -1 })
      .lean();

    const totalStudents = students.length;

    res.status(200).json({
      success: true,
      students,
      totalStudents,
    });
  } catch (error: any) {
    console.error("[GET ALL STUDENTS ERROR]", error.message);
    res.status(500).json({ message: "Error retrieving students" });
  }
};

export const getAllProfessors = async (req: Request, res: Response) => {
  try {
    const professors = await User.find({})
      .select("-profilePicture -password -token")
      .where("role")
      .equals("professor")
      .sort({ createdAt: -1 })
      .lean();

    const totalProfessors = professors.length;

    res.status(200).json({
      success: true,
      professors,
      totalProfessors,
    });
  } catch (error: any) {
    console.error("[GET ALL STUDENTS ERROR]", error.message);
    res.status(500).json({ message: "Error retrieving students" });
  }
};

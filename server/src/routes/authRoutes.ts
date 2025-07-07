import express from "express";

const checkEmail = require("../controllers/authController").checkEmail;
const sendCode = require("../controllers/authController").sendCode;
const verifyCode = require("../controllers/authController").verifyCode;
const registerUser = require("../controllers/authController").registerUser;
const login = require("../controllers/authController").login;
const logout = require("../controllers/authController").logout;
const verifyToken = require("../middlewares/verifyToken").verifyToken;
const getProfile = require("../controllers/authController").getProfile;
const forgotPassword = require("../controllers/authController").forgotPassword;
const verifyResetCode =
  require("../controllers/authController").verifyResetCode;
const resetPassword = require("../controllers/authController").resetPassword;

const router = express.Router();

router.post("/check-email", checkEmail);
router.post("/send-code", sendCode);
router.post("/verify-code", verifyCode);
router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", verifyToken, getProfile);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);

export default router;

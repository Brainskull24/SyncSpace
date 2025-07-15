import express from "express";
const router = express.Router();

const checkEmail = require("../controllers/authController").checkEmail;
const sendCode = require("../controllers/authController").sendCode;
const verifyCode = require("../controllers/authController").verifyCode;
const registerUser = require("../controllers/authController").registerUser;
const login = require("../controllers/authController").login;
const logout = require("../controllers/authController").logout;
const verifyToken = require("../middlewares/verifyToken").verifyToken;
const getProfile = require("../controllers/authController").getProfile;
const updateProfile = require("../controllers/authController").updateProfile;
const forgotPassword = require("../controllers/authController").forgotPassword;
const verifyResetCode =
  require("../controllers/authController").verifyResetCode;
const resetPassword = require("../controllers/authController").resetPassword;
const requestDeleteAccount =
  require("../controllers/authController").requestDeleteAccount;
const getAllStudents = require("../controllers/authController").getAllStudents;
const getAllProfessors = require("../controllers/authController").getAllProfessors;


router.post("/check-email", checkEmail);
router.post("/send-code", sendCode);
router.post("/verify-code", verifyCode);
router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);
router.post("/request-delete-account", verifyToken, requestDeleteAccount);
router.get("/students", getAllStudents);
router.get("/professors", getAllProfessors);


export default router;
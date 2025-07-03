import express from "express"

const checkEmail = require("../controllers/authController").checkEmail;
const sendCode = require("../controllers/authController").sendCode;
const verifyCode = require("../controllers/authController").verifyCode;
const registerUser = require("../controllers/authController").registerUser;
const login = require("../controllers/authController").login;

const router = express.Router()

router.post("/check-email", checkEmail)
router.post("/send-code", sendCode)
router.post("/verify-code", verifyCode)
router.post("/register", registerUser)
router.post("/login", login)

export default router
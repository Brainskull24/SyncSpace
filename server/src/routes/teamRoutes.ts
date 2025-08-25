import express from "express";
import { upload } from "../middlewares/multer.middleware";

const router = express.Router();

const addTeam = require("../controllers/teamController").addTeam;

router.post("/create", upload.single("teamLogo"), addTeam);

export default router;

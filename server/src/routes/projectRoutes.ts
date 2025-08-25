import express from "express";
import { upload } from "../middlewares/multer.middleware";

const addProject = require("../controllers/projectController").addProject;
const getAllProjects =
  require("../controllers/projectController").getAllProjects;
const getSingleProject =
  require("../controllers/projectController").getSingleProject;
const addMultipleProjects =
  require("../controllers/projectController").addMultipleProjects;
const deleteProject = require("../controllers/projectController").deleteProject;
const updateProject = require("../controllers/projectController").updateProject;
const applyProject = require("../controllers/projectController").applyProject;
const router = express.Router();

router.post("/add-project", upload.array("projectFiles"), addProject);
router.put("/:id", updateProject);
router.get("/allprojects", getAllProjects);
router.delete("/:id", deleteProject);
router.get("/:id", getSingleProject);
router.post("/bulk-create", addMultipleProjects);
router.post("/apply/:projectId", applyProject);

export default router;
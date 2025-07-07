import { Request, Response } from "express";
import Project from "../models/projectModel";

export const addProject = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      category,
      objectives,
      difficulty,
      duration,
      technologies,
      minTeamSize,
      maxTeamSize,
      prerequisites,
      maxTeams,
      applicationDeadline,
      projectStartDate,
      projectEndDate,
      requireTeamIntro,
      requireSkillAssessment,
      requireProposal,
      requireVideoPitch,
      supervisorEmail,
      coSupervisorEmail,
      evaluationCriteria,
      gradingRubric,
      externalLinks,
      budget,
      equipmentRequirements,
      isPublic,
      hasIndustryPartner,
      isRealClient,
      requiresNDA,
    } = req.body;

    const project = await Project.create({
      title,
      description,
      category,
      difficulty,
      duration,
      technologies: JSON.parse(technologies),
      minTeamSize,
      maxTeamSize,
      prerequisites,
      maxTeams,
      applicationDeadline,
      projectStartDate,
      projectEndDate,
      requireTeamIntro,
      requireSkillAssessment,
      requireProposal,
      requireVideoPitch,
      supervisorEmail,
      coSupervisorEmail,
      evaluationCriteria,
      gradingRubric,
      externalLinks: JSON.parse(externalLinks),
      projectFiles:
        (req.files as Express.Multer.File[])?.map(
          (file: Express.Multer.File) => file.path
        ) || [],
      budget,
      equipmentRequirements,
      isPublic,
      hasIndustryPartner,
      isRealClient,
      requiresNDA,
    });

    res.status(201).json({ success: true, project });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: err,
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const updateData = req.body;
    if (!projectId) {
      return res.status(400).json({ success: false, message: "Project ID is required" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, project: updatedProject });
  } catch (error: any) {
    console.error("[UPDATE PROJECT ERROR]", error.message);
    res.status(500).json({ success: false, message: "Error updating project" });
  }
}

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const deletedProject = await Project.findByIdAndDelete({_id: projectId});

    if (!deletedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error: any) {
    console.error("[DELETE PROJECT ERROR]", error.message);
    res.status(500).json({ success: false, message: "Error deleting project" });
  }
}

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const listings = await Project.find({})
      .select("-projectFiles")
      .sort({ createdAt: -1 })
      .lean();

    const totalProjects = await Project.countDocuments();

    res.status(200).json({
      success: true,
      listings,
      totalProjects,
    });
  } catch (error: any) {
    console.error("[GET ALL PROJECTS ERROR]", error.message);
    res.status(500).json({ message: "Error retrieving projects" });
  }
};

export const getSingleProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });
    res.status(200).send({
      success: true,
      project,
    });
  } catch (error: any) {
    console.error("Error fetching project details:", error);
    res.status(500).send({
      success: false,
      message: "Error while getting project details",
      error: error.message,
    });
  }
};

export const addMultipleProjects = async (req: Request, res: Response) => {
  const { projects, versionInfo, commonBucketData } = req.body;

  if (!projects?.length || !versionInfo?.name || !versionInfo?.semester) {
    return res.status(400).json({ message: "Invalid input" });
  }

  // Create projects in bulk
  const savedProjects = await Project.insertMany(
    projects.map((p: any) => ({
      ...p,
      version: versionInfo.name,
      versionsemester: versionInfo.semester,
      versiondepartment: versionInfo.department,
      versiontags: versionInfo.tags,
      ...commonBucketData,
    }))
  );

  res.status(201).json({ message: "Projects created", data: savedProjects });
};



// export const getProjectsByVersion = async (req: Request, res: Response) => {
//   try {
//     const { version, semester, department } = req.query;

//     if (!version || !semester || !department) {
//       return res.status(400).json({ success: false, message: "Missing query parameters" });
//     }

//     const projects = await Project.find({
//       version,
//       versionsemester: semester,
//       versiondepartment: department,
//     });

//     res.status(200).json({ success: true, projects });
//   } catch (error) {
//     console.error("[GET PROJECTS BY VERSION ERROR]", error);
//     res.status(500).json({ success: false, message: "Error retrieving projects" });
//   }
// };

// export const getProjectsByProfessor = async (req: Request, res: Response) => {
//   try {
//     const { professorId } = req.query;

//     if (!professorId) {
//       return res.status(400).json({ success: false, message: "Professor ID is required" });
//     }

//     const projects = await Project.find({ professorId });

//     res.status(200).json({ success: true, projects });
//   } catch (error) {
//     console.error("[GET PROJECTS BY PROFESSOR ERROR]", error);
//     res.status(500).json({ success: false, message: "Error retrieving projects" });
//   }
// };

// export const getProjectsByCategory = async (req: Request, res: Response) => {
//   try {
//     const { category } = req.query;

//     if (!category) {
//       return res.status(400).json({ success: false, message: "Category is required" });
//     }

//     const projects = await Project.find({ category });

//     res.status(200).json({ success: true, projects });
//   } catch (error) {
//     console.error("[GET PROJECTS BY CATEGORY ERROR]", error);
//     res.status(500).json({ success: false, message: "Error retrieving projects" });
//   }
// };

// export const getProjectCountByCategory = async (req: Request, res: Response) => {
//   try {
//     const categories = await Project.aggregate([
//       { $group: { _id: "$category", count: { $sum: 1 } } },
//       { $project: { category: "$_id", count: 1, _id: 0 } },
//     ]);

//     res.status(200).json({ success: true, categories });
//   } catch (error) {
//     console.error("[GET PROJECT COUNT BY CATEGORY ERROR]", error);
//     res.status(500).json({ success: false, message: "Error retrieving project counts" });
//   }
// };

// export const getProjectsByDifficulty = async (req: Request, res: Response) => {
//   try {
//     const { difficulty } = req.query;

//     if (!difficulty) {
//       return res.status(400).json({ success: false, message: "Difficulty level is required" });
//     }

//     const projects = await Project.find({ difficulty });

//     res.status(200).json({ success: true, projects });
//   } catch (error) {
//     console.error("[GET PROJECTS BY DIFFICULTY ERROR]", error);
//     res.status(500).json({ success: false, message: "Error retrieving projects" });
//   }
// };

// export const getProjectsByStatus = async (req: Request, res: Response) => {
//   try {
//     const { status } = req.query;

//     if (!status) {
//       return res.status(400).json({ success: false, message: "Status is required" });
//     }

//     const projects = await Project.find({ status });

//     res.status(200).json({ success: true, projects });
//   } catch (error) {
//     console.error("[GET PROJECTS BY STATUS ERROR]", error);
//     res.status(500).json({ success: false, message: "Error retrieving projects" });
//   }
// };

// export const getProjectsByProfessorAndStatus = async (req: Request, res: Response) => {
//   try {
//     const { professorId, status } = req.query;

//     if (!professorId || !status) {
//       return res.status(400).json({ success: false, message: "Professor ID and status are required" });
//     }

//     const projects = await Project.find({ professorId, status });

//     res.status(200).json({ success: true, projects });
//   } catch (error) {
//     console.error("[GET PROJECTS BY PROFESSOR AND STATUS ERROR]", error);
//     res.status(500).json({ success: false, message: "Error retrieving projects" });
//   }
// };

// export const getProjectsByStudent = async (req: Request, res: Response) => {
//   try {
//     const { studentId } = req.query;

//     if (!studentId) {
//       return res.status(400).json({ success: false, message: "Student ID is required" });
//     }

//     const projects = await Project.find({ "teamMembers.studentId": studentId });

//     res.status(200).json({ success: true, projects });
//   } catch (error) {
//     console.error("[GET PROJECTS BY STUDENT ERROR]", error);
//     res.status(500).json({ success: false, message: "Error retrieving projects" });
//   }
// };

// export const getProjectsByTeam = async (req: Request, res: Response) => {
//   try {
//     const { teamId } = req.query;

//     if (!teamId) {
//       return res.status(400).json({ success: false, message: "Team ID is required" });
//     }

//     const projects = await Project.find({ "teams.teamId": teamId });

//     res.status(200).json({ success: true, projects });
//   } catch (error) {
//     console.error("[GET PROJECTS BY TEAM ERROR]", error);
//     res.status(500).json({ success: false, message: "Error retrieving projects" });
//   }
// };

// export const getProjectsByIndustryPartner = async (req: Request, res: Response) => {
//   try {
//     const { industryPartnerId } = req.query;

//     if (!industryPartnerId) {
//       return res.status(400).json({ success: false, message: "Industry Partner ID is required" });
//     }

//     const projects = await Project.find({ industryPartnerId });

//     res.status(200).json({ success: true, projects });
//   } catch (error) {
//     console.error("[GET PROJECTS BY INDUSTRY PARTNER ERROR]", error);
//     res.status(500).json({ success: false, message: "Error retrieving projects" });
//   }
// };

// export const getProjectsByRealClient = async (req: Request, res: Response) => {
//   try {
//     const { isRealClient } = req.query;

//     if (isRealClient === undefined) {
//       return res.status(400).json({ success: false, message: "isRealClient parameter is required" });
//     }

//     const projects = await Project.find({ isRealClient });

//     res.status(200).json({ success: true, projects });
//   } catch (error) {
//     console.error("[GET PROJECTS BY REAL CLIENT ERROR]", error);
//     res.status(500).json({ success: false, message: "Error retrieving projects" });
//   }
// };

// export const getProjectsByNDARequirement = async (req: Request, res: Response) => {
//   try {
//     const { requiresNDA } = req.query;

//     if (requiresNDA === undefined) {
//       return res.status(400).json({ success: false, message: "requiresNDA parameter is required" });
//     }

//     const projects = await Project.find({ requiresNDA });

//     res.status(200).json({ success: true, projects });
//   } catch (error) {
//     console.error("[GET PROJECTS BY NDA REQUIREMENT ERROR]", error);
//     res.status(500).json({ success: false, message: "Error retrieving projects" });
//   }
// };

// export const getProjectsByBudgetRange = async (req: Request, res: Response) => {
//   try {
//     const { minBudget, maxBudget } = req.query;

//     if (minBudget === undefined || maxBudget === undefined) {
//       return res.status(400).json({ success: false, message: "minBudget and maxBudget parameters are required" });
//     }

//     const projects = await Project.find({
//       budget: { $gte: Number(minBudget), $lte: Number(maxBudget) }
//     });

//     res.status(200).json({ success: true, projects });
//   } catch (error) {
//     console.error("[GET PROJECTS BY BUDGET RANGE ERROR]", error);
//     res.status(500).json({ success: false, message: "Error retrieving projects" });
//   }
// };

// export const getProjectsByEquipmentRequirements = async (req: Request, res: Response) => {
//   try {
//     const { equipment } = req.query;

//     if (!equipment) {
//       return res.status(400).json({ success: false, message: "Equipment parameter is required" });
//     }

//     const projects = await Project.find({
//       equipmentRequirements: { $in: [equipment] }
//     });

//     res.status(200).json({ success: true, projects });
//   } catch (error) {
//     console.error("[GET PROJECTS BY EQUIPMENT REQUIREMENTS ERROR]", error);
//     res.status(500).json({ success: false, message: "Error retrieving projects" });
//   }
// };



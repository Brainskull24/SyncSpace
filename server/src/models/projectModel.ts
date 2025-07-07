import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    objectives: String,
    category: { type: String, required: true }, // e.g. "ai", "web", "iot"
    difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
    duration: Number,

    minTeamSize: Number,
    maxTeamSize: Number,
    maxTeams: Number,

    prerequisites: String,
    technologies: [String],

    applicationDeadline: String,
    projectStartDate: String,
    projectEndDate: String,

    supervisorEmail: String,
    coSupervisorEmail: String,

    evaluationCriteria: String,
    gradingRubric: String,

    status: {
      type: String,
      default: "Active", 
    },

    externalLinks: [String],
    projectFiles: [String],

    requireTeamIntro: Boolean,
    requireSkillAssessment: Boolean,
    requireProposal: Boolean,
    requireVideoPitch: Boolean,

    budget: Number,
    equipmentRequirements: String,
    isPublic: Boolean,

    version: String,
    versiondescription: String,
    versionsemester: String,
    versiondepartment: String,
    versiontags: [String]

    // PHASE 2 - For Independent Projects

    // hasIndustryPartner: Boolean,
    // isRealClient: Boolean,
    // requiresNDA: Boolean,

  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);

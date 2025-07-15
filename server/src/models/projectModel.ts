import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    objectives: String,
    category: { type: String, required: true }, // e.g. "ai", "web", "iot"
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    duration: Number, // Form

    minTeamSize: Number, // Form
    maxTeamSize: Number, // Form
    maxTeams: Number,

    prerequisites: String,
    technologies: [String],

    applicationDeadline: String, // Form
    projectStartDate: String, // Form
    projectEndDate: String, // Form

    supervisor: {
      _id: mongoose.Schema.Types.ObjectId,
      firstName: String,
      lastName: String,
      phoneNumber: String,
      countryCode: String,
      academicYear: String,
      department: String,
      employeeId: String,
      profilePicture: String,
    },

    coSupervisor: {
      _id: mongoose.Schema.Types.ObjectId,
      firstName: String,
      lastName: String,
      phoneNumber: String,
      countryCode: String,
      academicYear: String,
      department: String,
      employeeId: String,
      profilePicture: String,
    },

    evaluationCriteria: String,
    gradingRubric: String,

    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Archived", "Pending Review", "Completed"],
    },

    externalLinks: [String],
    projectFiles: [String],

    requireTeamIntro: Boolean,
    requireSkillAssessment: Boolean,
    requireProposal: Boolean,
    requireVideoPitch: Boolean,

    budget: Number,
    equipmentRequirements: String,
    isPublic: {
      type: Boolean,
      default: true,
    },

    version: String,
    versiondescription: String,
    versionsemester: String,
    versiondepartment: String,
    versiontags: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);

// PHASE 2 - For Independent Projects

// createdBy: String,
// hasIndustryPartner: Boolean,
// isRealClient: Boolean,
// requiresNDA: Boolean,

export interface projectFormData {
  // Basic Information
  title: string;
  description: string;
  objectives: string;
  category: string;
  difficulty: string;
  duration: number;

  // Technical Requirements
  technologies: string[];
  minTeamSize: number;
  maxTeamSize: number;
  prerequisites: string;

  // Team & Application Settings
  maxTeams: number;
  applicationDeadline: string;
  projectStartDate: string;
  projectEndDate: string;
  requireTeamIntro: boolean;
  requireSkillAssessment: boolean;
  requireProposal: boolean;
  requireVideoPitch: boolean;

  // Professor Assignment
  supervisorId: string;
  coSupervisorId: string;
  evaluationCriteria: string;
  gradingRubric: string;

  // Resources & Materials
  projectFiles: File[];
  externalLinks: string[];
  budget: number;
  equipmentRequirements: string;

  // Advanced Settings
  isPublic: boolean;
  hasIndustryPartner: boolean;
  isRealClient: boolean;
  requiresNDA: boolean;
}

export const initialProjectFormData: projectFormData = {
  title: "",
  description: "",
  category: "",
  objectives: "",
  difficulty: "beginner",
  duration: 8,
  technologies: [],
  minTeamSize: 3,
  maxTeamSize: 5,
  prerequisites: "",
  maxTeams: 3,
  applicationDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  projectStartDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  projectEndDate: new Date(Date.now() + 77 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  requireTeamIntro: false,
  requireSkillAssessment: false,
  requireProposal: false,
  requireVideoPitch: false,
  supervisorId: "",
  coSupervisorId: "",
  evaluationCriteria: "",
  gradingRubric: "",
  projectFiles: [],
  externalLinks: [],
  budget: 0,
  equipmentRequirements: "",
  isPublic: true,
  hasIndustryPartner: false,
  isRealClient: false,
  requiresNDA: false,
};

export const gradingRubrics = [
  { value: "standard", label: "Standard Project Rubric" },
  { value: "research", label: "Research Project Rubric" },
  { value: "industry", label: "Industry Partnership Rubric" },
  { value: "custom", label: "Custom Rubric" },
];

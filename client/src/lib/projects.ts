import api from "./axios";
import type { projectFormData } from "../types/projectFormData";

export async function addProject(data: projectFormData) {
  const form = new FormData();

  form.append("title", data.title);
  form.append("description", data.description);
  form.append("category", data.category);
  form.append("difficulty", data.difficulty);
  form.append("duration", data.duration.toString());
  form.append("minTeamSize", data.minTeamSize.toString());
  form.append("maxTeamSize", data.maxTeamSize.toString());
  form.append("prerequisites", data.prerequisites);
  form.append("maxTeams", data.maxTeams.toString());
  form.append("applicationDeadline", data.applicationDeadline);
  form.append("projectStartDate", data.projectStartDate);
  form.append("projectEndDate", data.projectEndDate);
  form.append("requireTeamIntro", String(data.requireTeamIntro));
  form.append("requireSkillAssessment", String(data.requireSkillAssessment));
  form.append("requireProposal", String(data.requireProposal));
  form.append("requireVideoPitch", String(data.requireVideoPitch));
  form.append("supervisorId", data.supervisorId);
  form.append("coSupervisorId", data.coSupervisorId);
  form.append("evaluationCriteria", data.evaluationCriteria);
  form.append("gradingRubric", data.gradingRubric);
  form.append("budget", data.budget.toString());
  form.append("equipmentRequirements", data.equipmentRequirements);
  form.append("isPublic", String(data.isPublic));
  form.append("hasIndustryPartner", String(data.hasIndustryPartner));
  form.append("isRealClient", String(data.isRealClient));
  form.append("requiresNDA", String(data.requiresNDA));

  form.append("technologies", JSON.stringify(data.technologies));
  form.append("externalLinks", JSON.stringify(data.externalLinks));

  data.projectFiles.forEach((file) => {
    form.append("projectFiles", file);
  });

  const response = await api.post("/projects/add-project", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

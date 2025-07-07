"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import api from "@/lib/axios";

// --- Project Type ---
export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
  technologies: string[];
  minTeamSize: number;
  maxTeamSize: number;
  prerequisites: string;
  maxTeams: number;
  applicationDeadline: string;
  projectStartDate: string;
  projectEndDate: string;
  supervisorEmail: string;
  coSupervisorEmail: string;
  evaluationCriteria: string;
  gradingRubric: string;
  status: "Active" | "Completed" | "Archived";
  externalLinks: string[];
  projectFiles: string[];
  budget: number;
  version: string;
  versiondescription: string;
  versionsemester: string;
  versiondepartment: string;
  versiontags: string[];
};

// --- Context Type ---
type ProjectContextType = {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (project: Project | null) => void;
  refetchProjects: () => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// --- Hook ---
export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context)
    throw new Error("useProjectContext must be used inside ProjectProvider");
  return context;
};

// --- Provider ---
export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/projects/allProjects"); // Adjust endpoint as needed
      setProjects(data.listings || []);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // --- CRUD Actions ---
  const addProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
  };

  const updateProject = (updated: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (currentProject?.id === id) setCurrentProject(null);
  };

  const refetchProjects = () => {
    fetchProjects();
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        loading,
        error,
        addProject,
        updateProject,
        deleteProject,
        setCurrentProject,
        refetchProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

"use client";
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";
import { ReactNode } from "react";

interface Team {
  id: string;
  name: string;
  project?: Project;
  department?: string;
  formedBy: User; // Team leader (User)
  members: User[];
  status: "pending" | "active" | "disbanded";
  formationDate?: Date;
  feedback?: string;
  isLocked?: boolean;
  maxSize: number;
  minSize: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Professor {
  id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  countryCode?: string;
  department?: string;
  employeeId?: string;
  profilePicture?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  objectives?: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration?: number;

  minTeamSize?: number;
  maxTeamSize?: number;
  maxTeams?: number;

  prerequisites?: string;
  technologies?: string[];

  applicationDeadline?: string;
  projectStartDate?: string;
  projectEndDate?: string;

  supervisor: Professor;
  coSupervisor?: Professor;

  evaluationCriteria?: string;
  gradingRubric?: string;

  status: "Active" | "Archived" | "Pending Review" | "Completed";

  externalLinks?: string[];
  projectFiles?: string[];

  requireTeamIntro?: boolean;
  requireSkillAssessment?: boolean;
  requireProposal?: boolean;
  requireVideoPitch?: boolean;

  budget?: number;
  equipmentRequirements?: string;
  isPublic: boolean;

  version?: string;
  versiondescription?: string;
  versionsemester?: string;
  versiondepartment?: string;
  versiontags?: string[];

  createdAt?: Date;
  updatedAt?: Date;
}

interface User {
  id: string;
  email: string;
  universityId?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  countryCode?: string;
  academicYear?: string;
  department?: string;
  role: string;
  studentId?: string;
  employeeId?: string;
  adminPosition?: string;
  graduationYear?: string;
  profilePicture?: string;
  isTeamAlloted?: boolean;
  isProjectAlloted?: boolean;
  isDetained?: boolean;
  isTeamLead?: boolean;
  token?: string;
  team?: Team;
  project?: Project;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<AuthContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/profile", {
        withCredentials: true,
      });

      const userData = res.data.user;
      userData.id = res.data.user._id;

      if (userData.team && userData.team._id) {
        userData.team.id = userData.team._id;
      }

      setUser(userData);
    } catch {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const refreshUser = async () => {
    await fetchUser();
  };

  const logout = async () => {
    await api.get("/auth/logout");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, loading, setUser, logout, refreshUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

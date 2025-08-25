import {
  Home,
  Users,
  Search,
  FileText,
  Settings,
  HelpCircle,
} from "lucide-react";

export type Page =
  | "dashboard"
  | "team-formation"
  | "browse-projects"
  | "team-applications"
  | "team-details"
  | "submissions"
  | "settings"
  | "help";

export const navigation = [
  { id: "dashboard", name: "Dashboard", icon: Home },
  { id: "team-formation", name: "Team Formation", icon: Users },
  { id: "browse-projects", name: "Browse Projects", icon: Search },
  { id: "team-details", name: "Team Details", icon: Users },
  { id: "team-applications", name: "Team Applications", icon: Users },
  { id: "submissions", name: "Submissions", icon: FileText },
  { id: "settings", name: "Settings", icon: Settings },
  { id: "help", name: "Help & Support", icon: HelpCircle },
];

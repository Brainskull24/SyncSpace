// lib/page-renderer.tsx
"use client";

import { StudentDashboard } from "@/components/student-dashboard/pages/student-dashboard";
import { TeamFormation } from "@/components/student-dashboard/pages/team-formation";
import { BrowseProjects } from "@/components/student-dashboard/pages/browse-projects";
import TeamPage from "@/components/student-dashboard/pages/team-details";
import ProjectsPage from "@/components/student-dashboard/pages/team-applications";
import { Page } from "@/types/student-pages";

export function renderPage(
  currentPage: Page,
  onNavigate: (page: Page) => void
) {
  const props = { onNavigate };

  switch (currentPage) {
    case "dashboard":
      return <StudentDashboard {...props} />;
    case "team-formation":
      return <TeamFormation {...props} />;
    case "browse-projects":
      return <BrowseProjects {...props} />;
    case "team-details":
      return <TeamPage {...props} />;
    case "team-applications":
      return <ProjectsPage {...props} />;
    default:
      return <StudentDashboard {...props} />;
  }
}

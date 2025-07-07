"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Users,
  Calendar,
  DollarSign,
  Clock,
  MapPin,
  User,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    case "Draft":
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800">
          Draft
        </Badge>
      );
    case "Pending":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
          Pending
        </Badge>
      );
    case "Completed":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800">
          Completed
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return <Badge className="bg-green-100 text-green-800">Beginner</Badge>;
    case "intermediate":
      return (
        <Badge className="bg-yellow-100 text-yellow-800">Intermediate</Badge>
      );
    case "advanced":
      return <Badge className="bg-red-100 text-red-800">Advanced</Badge>;
    default:
      return <Badge variant="outline">{difficulty}</Badge>;
  }
};

export default function ProjectViewDetails() {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const params = useParams();
  const router = useRouter();
  const projectId = params.id;

  useEffect(() => {
    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/projects/${projectId}`);
      setProject(data?.project || data);
    } catch (err) {
      console.error("Failed to fetch project details:", err);
      setError("Failed to load project details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading project details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error || "Project not found"}</p>
            <Link href="/admin-dashboard/project-buckets">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    // <div className="container mx-auto p-6">
    //   {/* Header */}
    //   <div className="flex items-center justify-between mb-6">
    //     <div className="flex items-center gap-4">
    //       <Link href="/admin-dashboard/project-buckets">
    //         <Button variant="outline" size="sm">
    //           <ArrowLeft className="mr-2 h-4 w-4" />
    //           Back
    //         </Button>
    //       </Link>
    //       <div>
    //         <h1 className="text-3xl font-bold tracking-tight">
    //           {project.title}
    //         </h1>
    //         <p className="text-muted-foreground">Project Details</p>
    //       </div>
    //     </div>
    //     <div className="flex gap-2">
    //       <Link href={`/admin-dashboard/project-buckets/${projectId}/edit`}>
    //         <Button>
    //           <Edit className="mr-2 h-4 w-4" />
    //           Edit Project
    //         </Button>
    //       </Link>
    //     </div>
    //   </div>

    //   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    //     {/* Main Content */}
    //     <div className="lg:col-span-2 space-y-6">
    //       {/* Project Overview */}
    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Project Overview</CardTitle>
    //         </CardHeader>
    //         <CardContent className="space-y-4">
    //           <div>
    //             <h3 className="font-semibold mb-2">Description</h3>
    //             <p className="text-muted-foreground leading-relaxed">
    //               {project.description || "No description provided."}
    //             </p>
    //           </div>

    //           {project.objectives && (
    //             <div>
    //               <h3 className="font-semibold mb-2">Objectives</h3>
    //               <p className="text-muted-foreground leading-relaxed">
    //                 {project.objectives}
    //               </p>
    //             </div>
    //           )}

    //           {project.requirements && (
    //             <div>
    //               <h3 className="font-semibold mb-2">Requirements</h3>
    //               <p className="text-muted-foreground leading-relaxed">
    //                 {project.requirements}
    //               </p>
    //             </div>
    //           )}

    //           {project.deliverables && (
    //             <div>
    //               <h3 className="font-semibold mb-2">Deliverables</h3>
    //               <p className="text-muted-foreground leading-relaxed">
    //                 {project.deliverables}
    //               </p>
    //             </div>
    //           )}
    //         </CardContent>
    //       </Card>

    //       {/* Skills & Technologies */}
    //       {(project.skillsRequired || project.technologies) && (
    //         <Card>
    //           <CardHeader>
    //             <CardTitle>Skills & Technologies</CardTitle>
    //           </CardHeader>
    //           <CardContent className="space-y-4">
    //             {project.skillsRequired && (
    //               <div>
    //                 <h3 className="font-semibold mb-2">Required Skills</h3>
    //                 <div className="flex flex-wrap gap-2">
    //                   {project.skillsRequired
    //                     .split(",")
    //                     .map((skill: string, index: number) => (
    //                       <Badge key={index} variant="secondary">
    //                         {skill.trim()}
    //                       </Badge>
    //                     ))}
    //                 </div>
    //               </div>
    //             )}

    //             {project.technologies && (
    //               <div>
    //                 <h3 className="font-semibold mb-2">Technologies</h3>
    //                 <div className="flex flex-wrap gap-2">
    //                   {Array.isArray(project.technologies) ? (
    //                     project.technologies.map(
    //                       (tech: string, index: number) => (
    //                         <Badge key={index} variant="outline">
    //                           {tech.trim()}
    //                         </Badge>
    //                       )
    //                     )
    //                   ) : typeof project.technologies === "string" ? (
    //                     project.technologies
    //                       .split(",")
    //                       .map((tech: string, index: number) => (
    //                         <Badge key={index} variant="outline">
    //                           {tech.trim()}
    //                         </Badge>
    //                       ))
    //                   ) : (
    //                     <p className="text-sm text-muted-foreground">
    //                       No technologies listed
    //                     </p>
    //                   )}
    //                 </div>
    //               </div>
    //             )}
    //           </CardContent>
    //         </Card>
    //       )}

    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Project Information</CardTitle>
    //         </CardHeader>
    //         <CardContent className="space-y-4">
    //           <div className="flex items-center gap-2">
    //             <User className="h-4 w-4 text-muted-foreground" />
    //             <div>
    //               <p className="text-sm font-medium">Professor</p>
    //               <p className="text-sm text-muted-foreground">
    //                 {project.professorId || "Not assigned"}
    //               </p>
    //             </div>
    //           </div>

    //           <div className="flex items-center gap-2">
    //             <BookOpen className="h-4 w-4 text-muted-foreground" />
    //             <div>
    //               <p className="text-sm font-medium">Category</p>
    //               <p className="text-sm text-muted-foreground">
    //                 {project.category || "Not specified"}
    //               </p>
    //             </div>
    //           </div>

    //           <div className="flex items-center gap-2">
    //             <Calendar className="h-4 w-4 text-muted-foreground" />
    //             <div>
    //               <p className="text-sm font-medium">Application Deadline</p>
    //               <p className="text-sm text-muted-foreground">
    //                 {project.applicationDeadline
    //                   ? new Date(
    //                       project.applicationDeadline
    //                     ).toLocaleDateString("en-GB")
    //                   : "Not set"}
    //               </p>
    //             </div>
    //           </div>

    //           {project.projectDeadline && (
    //             <div className="flex items-center gap-2">
    //               <Clock className="h-4 w-4 text-muted-foreground" />
    //               <div>
    //                 <p className="text-sm font-medium">Project Deadline</p>
    //                 <p className="text-sm text-muted-foreground">
    //                   {new Date(project.projectDeadline).toLocaleDateString(
    //                     "en-GB"
    //                   )}
    //                 </p>
    //               </div>
    //             </div>
    //           )}

    //           {project.location && (
    //             <div className="flex items-center gap-2">
    //               <MapPin className="h-4 w-4 text-muted-foreground" />
    //               <div>
    //                 <p className="text-sm font-medium">Location</p>
    //                 <p className="text-sm text-muted-foreground">
    //                   {project.location}
    //                 </p>
    //               </div>
    //             </div>
    //           )}
    //         </CardContent>
    //       </Card>
    //     </div>

    //     {/* Sidebar */}
    //     <div className="space-y-6">
    //       {/* Project Status */}
    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Project Status</CardTitle>
    //         </CardHeader>
    //         <CardContent className="space-y-4">
    //           <div className="flex items-center justify-between">
    //             <span className="text-sm font-medium">Status</span>
    //             {getStatusBadge(project.status)}
    //           </div>
    //           <div className="flex items-center justify-between">
    //             <span className="text-sm font-medium">Difficulty</span>
    //             {getDifficultyBadge(project.difficulty)}
    //           </div>
    //           <Separator />
    //           <div className="flex items-center gap-2">
    //             <Users className="h-4 w-4 text-muted-foreground" />
    //             <span className="text-sm">
    //               Teams: 0/{project.maxTeams || "N/A"}
    //             </span>
    //           </div>
    //           <div className="flex items-center gap-2">
    //             <DollarSign className="h-4 w-4 text-muted-foreground" />
    //             <span className="text-sm">
    //               Budget: ${project.budget || "N/A"}
    //             </span>
    //           </div>
    //         </CardContent>
    //       </Card>

    //       {/* Project Details */}

    //       {/* Timestamps */}
    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Timeline</CardTitle>
    //         </CardHeader>
    //         <CardContent className="space-y-4">
    //           <div>
    //             <p className="text-sm font-medium">Created</p>
    //             <p className="text-sm text-muted-foreground">
    //               {project.createdAt
    //                 ? new Date(project.createdAt).toLocaleDateString("en-GB")
    //                 : "Unknown"}
    //             </p>
    //           </div>
    //           <div>
    //             <p className="text-sm font-medium">Last Updated</p>
    //             <p className="text-sm text-muted-foreground">
    //               {project.updatedAt
    //                 ? new Date(project.updatedAt).toLocaleDateString("en-GB")
    //                 : "Unknown"}
    //             </p>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     </div>
    //   </div>
    // </div>

    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin-dashboard/project-buckets">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {project.title}
            </h1>
            <p className="text-muted-foreground">Project Details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin-dashboard/project-buckets/${projectId}/edit`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description || "No description provided."}
                </p>
              </div>

              {project.objectives && (
                <div>
                  <h3 className="font-semibold mb-2">Objectives</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.objectives}
                  </p>
                </div>
              )}

              {project.requirements && (
                <div>
                  <h3 className="font-semibold mb-2">Requirements</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.requirements}
                  </p>
                </div>
              )}

              {project.deliverables && (
                <div>
                  <h3 className="font-semibold mb-2">Deliverables</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.deliverables}
                  </p>
                </div>
              )}

              {project.prerequisites && (
                <div>
                  <h3 className="font-semibold mb-2">Prerequisites</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.prerequisites}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills & Technologies */}
          {(project.skillsRequired || project.technologies) && (
            <Card>
              <CardHeader>
                <CardTitle>Skills & Technologies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.skillsRequired && (
                  <div>
                    <h3 className="font-semibold mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.skillsRequired
                        .split(",")
                        .map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {skill.trim()}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}

                {project.technologies && (
                  <div>
                    <h3 className="font-semibold mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(project.technologies) ? (
                        project.technologies.map(
                          (tech: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {tech.trim()}
                            </Badge>
                          )
                        )
                      ) : typeof project.technologies === "string" ? (
                        project.technologies
                          .split(",")
                          .map((tech: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {tech.trim()}
                            </Badge>
                          ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No technologies listed
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Evaluation & Grading */}
          <Card>
            <CardHeader>
              <CardTitle>Evaluation & Grading</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.evaluationCriteria && (
                <div>
                  <h3 className="font-semibold mb-2">Evaluation Criteria</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.evaluationCriteria}
                  </p>
                </div>
              )}
              {project.gradingRubric && (
                <div>
                  <h3 className="font-semibold mb-2">Grading Rubric</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.gradingRubric}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Version Info */}
          <Card>
            <CardHeader>
              <CardTitle>Version Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground text-sm">
              <p>
                <strong>Version:</strong> {project.version || "N/A"}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {project.versiondescription || "N/A"}
              </p>
              <p>
                <strong>Semester:</strong> {project.versionsemester || "N/A"}
              </p>
              <p>
                <strong>Department:</strong>{" "}
                {project.versiondepartment || "N/A"}
              </p>
              <p>
                <strong>Tags:</strong>{" "}
                {project.versiontags?.length > 0
                  ? project.versiontags.join(", ")
                  : "None"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Status */}
          <Card>
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                {getStatusBadge(project.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Difficulty</span>
                {getDifficultyBadge(project.difficulty)}
              </div>
              <Separator />
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Teams: 0/{project.maxTeams || "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Team Size: {project.minTeamSize}–{project.maxTeamSize}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Budget: ${project.budget || "N/A"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Professor</p>
                  <p className="text-sm text-muted-foreground">
                    {project.supervisorEmail || "Not assigned"}
                  </p>
                  {project.coSupervisorEmail && (
                    <p className="text-sm text-muted-foreground italic">
                      Co-supervisor: {project.coSupervisorEmail}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Category</p>
                  <p className="text-sm text-muted-foreground">
                    {project.category || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Application Deadline</p>
                  <p className="text-sm text-muted-foreground">
                    {project.applicationDeadline
                      ? new Date(
                          project.applicationDeadline
                        ).toLocaleDateString("en-GB")
                      : "Not set"}
                  </p>
                </div>
              </div>

              {project.projectDeadline && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Project Deadline</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(project.projectDeadline).toLocaleDateString(
                        "en-GB"
                      )}
                    </p>
                  </div>
                </div>
              )}

              {project.duration && (
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">
                    {project.duration} weeks
                  </p>
                </div>
              )}

              {project.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {project.location}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.externalLinks?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">External Links</h3>
                  <ul className="list-disc list-inside text-sm text-blue-600">
                    {project.externalLinks.map(
                      (link: string, index: number) => (
                        <li key={index}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
              {project.projectFiles?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Project Files</h3>
                  <ul className="list-disc list-inside text-sm text-blue-600">
                    {project.projectFiles.map((file: string, index: number) => (
                      <li key={index}>
                        <a
                          href={file}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file.split("/").pop()}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

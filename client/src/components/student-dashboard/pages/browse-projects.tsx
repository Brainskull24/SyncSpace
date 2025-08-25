"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Filter,
  Heart,
  Search,
  Users,
  X,
  Eye,
  Send,
  FileText,
  Video,
  DollarSign,
  Settings,
} from "lucide-react";
import api from "@/lib/axios";
import { useUser } from "@/context/Authcontext";
import { toast } from "sonner";
import { Page } from "@/types/student-pages";

interface BrowseProjectsProps {
  onNavigate: (page: Page) => void;
}

export function BrowseProjects({ onNavigate }: BrowseProjectsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [error, setError] = useState("");
  const { user } = useUser();

  useEffect(() => {
    getAllProjects();
    const intervalId = setInterval(getAllProjects, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const getAllProjects = async () => {
    try {
      const { data } = await api.get("/projects/allprojects");
      setProjects(data.listings || []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError("Failed to load project data.");
    }
  };

  const projectApplication = async (projectId: string) => {
    try {
      if (!user?.team) {
        toast.error("You must be part of a team to apply for projects.");
        return;
      }

      if(!user.isTeamLead) {
        toast.error("Only team leads can apply for projects.");
        return;
      }  

      await api.post(`/projects/apply/${projectId}`, {
        teamId: user.team.id,
      });
      toast.success("Successfully applied for the project!");

    } catch (error: any) {
      toast.error(`${error.response?.data?.message || "Failed to apply for the project. Please try again later."}`);
      console.error("Error applying for project:", error);
    }
  };

  const categories = ["All", "ai", "web", "iot", "mobile", "data-science"];

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies?.some((tech: string) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const toggleWishlist = (projectId: string) => {
    setWishlist((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const getUrgencyColor = (deadline: string) => {
    if (!deadline) return "text-gray-600";
    const days = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (days <= 3) return "text-red-600";
    if (days <= 7) return "text-yellow-600";
    return "text-green-600";
  };

  const getUrgencyBadge = (deadline: string) => {
    if (!deadline)
      return { variant: "secondary" as const, text: "No Deadline" };
    const days = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (days <= 3) return { variant: "destructive" as const, text: "Urgent" };
    if (days <= 7) return { variant: "default" as const, text: "Soon" };
    return { variant: "secondary" as const, text: "Open" };
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case "Pending Review":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            Pending Review
          </Badge>
        );
      case "Completed":
        return <Badge className="bg-blue-100 text-blue-700">Completed</Badge>;
      case "Archived":
        return <Badge className="bg-gray-100 text-gray-700">Archived</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">{status}</Badge>;
    }
  };

  const formatTeamSize = (minSize: number, maxSize: number) => {
    if (minSize === maxSize) return `${minSize} members`;
    return `${minSize}-${maxSize} members`;
  };

  const formatDuration = (duration: number) => {
    if (!duration) return "Not specified";
    if (duration === 1) return "1 semester";
    return `${duration} semesters`;
  };

  const getSupervisorName = (supervisor: any) => {
    if (!supervisor) return "Not assigned";
    return (
      `${supervisor.firstName || ""} ${supervisor.lastName || ""}`.trim() ||
      "Unknown"
    );
  };

  const parseObjectives = (objectives: string) => {
    if (!objectives) return [];
    // Split by common delimiters and filter empty strings
    return objectives
      .split(/[,;.\n]/)
      .map((obj) => obj.trim())
      .filter((obj) => obj.length > 0)
      .slice(0, 5); // Limit to 5 objectives for display
  };

  const parsePrerequisites = (prerequisites: string) => {
    if (!prerequisites) return [];
    return prerequisites
      .split(/[,;.\n]/)
      .map((req) => req.trim())
      .filter((req) => req.length > 0);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate("dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Available Projects</h1>
            <p className="text-muted-foreground">
              Discover and apply to exciting semester projects
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {filteredProjects.length} projects found
            </span>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-800">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects, technologies, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevant">Most Relevant</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="recent">Recently Posted</SelectItem>
                <SelectItem value="difficulty">Difficulty</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category.toLowerCase()}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem
                          key={difficulty}
                          value={difficulty.toLowerCase()}
                        >
                          {difficulty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending Review</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Semester</SelectItem>
                      <SelectItem value="2">2 Semesters</SelectItem>
                      <SelectItem value="3">3+ Semesters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project._id} className="flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="capitalize">
                      {project.category}
                    </Badge>
                    {project.applicationDeadline && (
                      <Badge {...getUrgencyBadge(project.applicationDeadline)}>
                        {getUrgencyBadge(project.applicationDeadline).text}
                      </Badge>
                    )}
                    {getStatusBadge(project.status)}
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {project.title}
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleWishlist(project._id)}
                  className="shrink-0"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      wishlist.includes(project._id)
                        ? "fill-red-500 text-red-500"
                        : ""
                    }`}
                  />
                </Button>
              </div>
              <CardDescription className="line-clamp-3">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              {/* Technologies */}
              <div className="flex flex-wrap gap-1">
                {project.technologies?.slice(0, 3).map((tech: string) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies?.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>

              {/* Supervisor Info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={project.supervisor?.firstName[0]} />
                  <AvatarFallback>
                    {project.supervisor?.firstName?.[0]}
                    {project.supervisor?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {getSupervisorName(project.supervisor)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {project.supervisor?.department || "N/A"}
                  </p>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Team Size:</span>
                  <span>
                    {formatTeamSize(
                      project.minTeamSize || 1,
                      project.maxTeamSize || 1
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{formatDuration(project.duration)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <Badge
                    variant={
                      project.difficulty === "Advanced"
                        ? "destructive"
                        : project.difficulty === "Intermediate"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {project.difficulty}
                  </Badge>
                </div>
                {project.applicationDeadline && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Deadline:</span>
                    <span
                      className={getUrgencyColor(project.applicationDeadline)}
                    >
                      {new Date(
                        project.applicationDeadline
                      ).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Max Teams Info */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Max {project.maxTeams || 1} teams</span>
                {project.budget >= 0 && (
                  <>
                    <Separator orientation="vertical" className="h-4" />
                    <DollarSign className="h-4 w-4" />
                    <span>${project.budget}</span>
                  </>
                )}
              </div>

              {/* Requirements Indicators */}
              <div className="flex flex-wrap gap-1">
                {/* {!project.requireTeamIntro && ( */}
                <Badge variant="outline" className="text-xs">
                  Team Intro Required
                </Badge>
                {/* )} */}
                {/* {project.requireSkillAssessment && ( */}
                <Badge variant="outline" className="text-xs">
                  Skill Assessment
                </Badge>
                {/* )} */}
                {/* {project.requireProposal && ( */}
                <Badge variant="outline" className="text-xs">
                  Proposal Required
                </Badge>
                {/* )} */}
                {/* {project.requireVideoPitch && ( */}
                <Badge variant="outline" className="text-xs">
                  Video Pitch
                </Badge>
                {/* )} */}
              </div>
            </CardContent>
            <div className="p-6 pt-0 flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      {project.title}
                      <Badge variant="outline" className="capitalize">
                        {project.category}
                      </Badge>
                      {getStatusBadge(project.status)}
                    </DialogTitle>
                    <DialogDescription>{project.description}</DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="requirements">
                        Requirements
                      </TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="supervisor">Supervisor</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Project Objectives</h4>
                          {parseObjectives(project.objectives).length > 0 ? (
                            <ul className="text-sm space-y-1">
                              {parseObjectives(project.objectives).map(
                                (objective: string, index: number) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2"
                                  >
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    {objective}
                                  </li>
                                )
                              )}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              No specific objectives listed
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Technology Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies?.map((tech: string) => (
                              <Badge key={tech} variant="secondary">
                                {tech}
                              </Badge>
                            )) || (
                              <p className="text-sm text-muted-foreground">
                                No technologies specified
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                        <div className="text-center">
                          <p className="text-2xl font-bold">
                            {formatTeamSize(
                              project.minTeamSize || 1,
                              project.maxTeamSize || 1
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Team Size
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold">
                            {formatDuration(project.duration)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Duration
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold">
                            {project.difficulty}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Difficulty
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="requirements" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">
                              Required Technical Skills
                            </h4>
                            <div className="space-y-2">
                              {project.technologies?.map((skill: string) => (
                                <div
                                  key={skill}
                                  className="flex items-center gap-2"
                                >
                                  <div className="h-2 w-2 rounded-full bg-red-500" />
                                  <span className="text-sm">{skill}</span>
                                </div>
                              )) || (
                                <p className="text-sm text-muted-foreground">
                                  No specific skills required
                                </p>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Prerequisites</h4>
                            <div className="space-y-2">
                              {parsePrerequisites(project.prerequisites)
                                .length > 0 ? (
                                parsePrerequisites(project.prerequisites).map(
                                  (req: string, index: number) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2"
                                    >
                                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                                      <span className="text-sm">{req}</span>
                                    </div>
                                  )
                                )
                              ) : (
                                <p className="text-sm text-muted-foreground">
                                  No specific prerequisites
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">
                              Application Requirements
                            </h4>
                            <div className="space-y-2">
                              {project.requireTeamIntro && (
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-blue-500" />
                                  <span className="text-sm">
                                    Team Introduction Required
                                  </span>
                                </div>
                              )}
                              {project.requireSkillAssessment && (
                                <div className="flex items-center gap-2">
                                  <Settings className="h-4 w-4 text-green-500" />
                                  <span className="text-sm">
                                    Skill Assessment Required
                                  </span>
                                </div>
                              )}
                              {project.requireProposal && (
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-purple-500" />
                                  <span className="text-sm">
                                    Project Proposal Required
                                  </span>
                                </div>
                              )}
                              {project.requireVideoPitch && (
                                <div className="flex items-center gap-2">
                                  <Video className="h-4 w-4 text-red-500" />
                                  <span className="text-sm">
                                    Video Pitch Required
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">
                              Equipment & Budget
                            </h4>
                            {project.budget && (
                              <p className="text-sm">
                                Budget: ${project.budget}
                              </p>
                            )}
                            {project.equipmentRequirements && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {project.equipmentRequirements}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="details" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">
                              Project Timeline
                            </h4>
                            <div className="space-y-2 text-sm">
                              {project.applicationDeadline && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    Application Deadline:
                                  </span>
                                  <span>
                                    {new Date(
                                      project.applicationDeadline
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                              {project.projectStartDate && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    Start Date:
                                  </span>
                                  <span>
                                    {new Date(
                                      project.projectStartDate
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                              {project.projectEndDate && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    End Date:
                                  </span>
                                  <span>
                                    {new Date(
                                      project.projectEndDate
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Evaluation</h4>
                            {project.evaluationCriteria ? (
                              <p className="text-sm text-muted-foreground">
                                {project.evaluationCriteria}
                              </p>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                Standard evaluation criteria apply
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">
                              Version Information
                            </h4>
                            <div className="space-y-1 text-sm">
                              {project.version && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    Version:
                                  </span>
                                  <span>{project.version}</span>
                                </div>
                              )}
                              {project.versionsemester && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    Semester:
                                  </span>
                                  <span>{project.versionsemester}</span>
                                </div>
                              )}
                              {project.versiondepartment && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    Department:
                                  </span>
                                  <span>{project.versiondepartment}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {project.versiontags &&
                            project.versiontags.length > 0 && (
                              <div>
                                <h4 className="font-medium mb-2">Tags</h4>
                                <div className="flex flex-wrap gap-1">
                                  {project.versiontags.map((tag: string) => (
                                    <Badge
                                      key={tag}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="supervisor" className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage
                            src={project.supervisor?.profilePicture || "/"}
                          />
                          <AvatarFallback>
                            {project.supervisor?.firstName?.[0]}
                            {project.supervisor?.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">
                            {getSupervisorName(project.supervisor)}
                          </h3>
                          <p className="text-muted-foreground">
                            {project.supervisor?.department || "N/A"}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {project.supervisor?.email ||
                              "Contact through department"}
                          </p>
                        </div>
                      </div>
                      {project.coSupervisor && (
                        <div>
                          <h4 className="font-medium mb-2">Co-Supervisor</h4>
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage
                                src={
                                  project.coSupervisor?.profilePicture || "/"
                                }
                              />
                              <AvatarFallback>
                                {project.coSupervisor?.firstName?.[0]}
                                {project.coSupervisor?.lastName?.[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">
                                {getSupervisorName(project.coSupervisor)}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {project.coSupervisor?.department || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {project.externalLinks &&
                        project.externalLinks.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">
                              External Resources
                            </h4>
                            <div className="space-y-1">
                              {project.externalLinks.map(
                                (link: string, index: number) => (
                                  <a
                                    key={index}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:underline block"
                                  >
                                    {link}
                                  </a>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </TabsContent>
                  </Tabs>
                  <div className="flex gap-2 pt-4">
                    <Button
                      className="flex-1"
                      disabled={project.status !== "Active"}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {project.status === "Active"
                        ? "Apply Now"
                        : `Cannot Apply - ${project.status}`}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => toggleWishlist(project._id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          wishlist.includes(project._id)
                            ? "fill-red-500 text-red-500"
                            : ""
                        }`}
                      />
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                className="flex-1"
                disabled={project.status !== "Active"}
                onClick={() => projectApplication(project._id)}
              >
                <Send className="h-4 w-4 mr-2" />
                Apply
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-muted-foreground mb-4">
            <Search className="h-full w-full" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters to find more projects.
          </p>
          <Button variant="outline" onClick={() => setSearchQuery("")}>
            Clear Search
          </Button>
        </div>
      )}

      {/* Wishlist Section */}
      {wishlist.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Wishlist ({wishlist.length})
            </CardTitle>
            <CardDescription>Projects you've saved for later</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {wishlist.map((projectId) => {
                const project = projects.find((p) => p._id === projectId);
                return project ? (
                  <div
                    key={projectId}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {getSupervisorName(project.supervisor)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {project.category}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleWishlist(projectId)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

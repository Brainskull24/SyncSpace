"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Camera,
  CheckCircle,
  Mail,
  QrCode,
  Search,
  Send,
  X,
  Users,
  Check,
  UserPlus,
  Key,
  Eye,
  Copy,
} from "lucide-react";
import { useUser } from "@/context/Authcontext";
import { toast } from "sonner";
import api from "@/lib/axios";
import { Page } from "@/types/student-pages";

interface TeamFormationProps {
  onNavigate: (page: Page) => void;
}

export function TeamFormation({ onNavigate }: TeamFormationProps) {
  const [mode, setMode] = useState<"create" | "join">("create");
  const [currentStep, setCurrentStep] = useState(1);
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { user } = useUser();

  const handleCheckboxChange = (skill: string, checked: boolean) => {
    if (checked) {
      setSelectedSkills((prev) => [...prev, skill]);
    } else {
      setSelectedSkills((prev) => prev.filter((s) => s !== skill));
    }
  };

  const createTeam = async () => {
    if (user?.team) {
      toast.error(
        "You already have a team. Please leave it before creating a new one."
      );
      return;
    }

    if (!teamName || !teamDescription) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("teamName", teamName);
      formData.append("teamDescription", teamDescription);
      formData.append("inviteLink", inviteLink);
      formData.append("createdBy", user?.id || "");
      formData.append("skills", selectedSkills.join(","));

      if (logo) {
        formData.append("teamLogo", logo);
      }

      const res = await api.post("/teams/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201 || res.status === 200) {
        toast.success("Team created successfully!");
        onNavigate("dashboard");
      } else {
        toast.error("Failed to create team. Try again.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the team.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const inviteLink = `https://syncspace.edu/join/${teamName}`;

  const handleCopy = async () => {
    if (!teamName) return;
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoinTeam = (team: any) => {
    onNavigate("dashboard");
  };

  const handleRespondToInvitation = (
    invitationId: number,
    response: "accept" | "decline"
  ) => {
    // Handle invitation response logic here
    console.log(`${response} invitation:`, invitationId);
    if (response === "accept") {
      onNavigate("dashboard");
    }
  };

  const handleJoinWithCode = () => {
    // Handle joining with team code logic here
    console.log("Joining with code:", teamCode);
    onNavigate("dashboard");
  };

  const steps = [
    { id: 1, name: "Team Details", completed: false },
    { id: 2, name: "Invite Members", completed: false },
    { id: 3, name: "Skill Requirements", completed: false },
    { id: 4, name: "Team Agreement", completed: false },
  ];

  const availableStudents = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@university.edu",
      year: "Junior",
      major: "Computer Science",
      skills: ["React", "Node.js", "Python", "UI/UX"],
      avatar: "/?height=40&width=40",
      availability: "Available",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.c@university.edu",
      year: "Senior",
      major: "Software Engineering",
      skills: ["Java", "Spring", "MongoDB", "DevOps"],
      avatar: "/?height=40&width=40",
      availability: "Busy",
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma.d@university.edu",
      year: "Sophomore",
      major: "Computer Science",
      skills: ["JavaScript", "React", "CSS", "Design"],
      avatar: "/?height=40&width=40",
      availability: "Available",
    },
  ];

  const pendingInvitations = [
    {
      name: "Sarah Johnson",
      email: "sarah.j@university.edu",
      status: "Pending",
      sentDate: "2024-01-10",
    },
    {
      name: "Mike Chen",
      email: "mike.c@university.edu",
      status: "Viewed",
      sentDate: "2024-01-09",
    },
  ];

  // Mock data for received invitations
  const receivedInvitations = [
    {
      id: 1,
      teamName: "Code Warriors",
      teamLead: "John Doe",
      teamLeadEmail: "john.doe@university.edu",
      teamLeadAvatar: "/?height=40&width=40",
      projectTitle: "E-commerce Platform Development",
      memberCount: 2,
      maxMembers: 4,
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      description:
        "Building a full-stack e-commerce platform with modern technologies",
      invitedDate: "2024-01-12",
      status: "pending",
      teamCode: "CW2024",
    },
    {
      id: 2,
      teamName: "Data Wizards",
      teamLead: "Alice Smith",
      teamLeadEmail: "alice.smith@university.edu",
      teamLeadAvatar: "/?height=40&width=40",
      projectTitle: "Machine Learning Analytics Dashboard",
      memberCount: 3,
      maxMembers: 5,
      skills: ["Python", "TensorFlow", "React", "Data Analysis"],
      description:
        "Creating an ML-powered analytics dashboard for business insights",
      invitedDate: "2024-01-11",
      status: "pending",
      teamCode: "DW2024",
    },
    {
      id: 3,
      teamName: "Mobile Masters",
      teamLead: "David Wilson",
      teamLeadEmail: "david.wilson@university.edu",
      teamLeadAvatar: "/?height=40&width=40",
      projectTitle: "Cross-platform Mobile App",
      memberCount: 1,
      maxMembers: 3,
      skills: ["React Native", "Firebase", "UI/UX"],
      description:
        "Developing a cross-platform mobile application for student services",
      invitedDate: "2024-01-10",
      status: "viewed",
      teamCode: "MM2024",
    },
  ];

  const publicTeams = [
    {
      id: 4,
      teamName: "Innovation Hub",
      teamLead: "Emma Johnson",
      teamLeadEmail: "emma.johnson@university.edu",
      teamLeadAvatar: "/?height=40&width=40",
      projectTitle: "IoT Smart Campus Solution",
      memberCount: 2,
      maxMembers: 4,
      skills: ["IoT", "Arduino", "Python", "React"],
      description:
        "Building IoT solutions to make campus life smarter and more efficient",
      lookingFor: ["Hardware Engineer", "Frontend Developer"],
      teamCode: "IH2024",
      isPublic: true,
    },
    {
      id: 5,
      teamName: "Blockchain Builders",
      teamLead: "Michael Brown",
      teamLeadEmail: "michael.brown@university.edu",
      teamLeadAvatar: "/?height=40&width=40",
      projectTitle: "Decentralized Voting System",
      memberCount: 1,
      maxMembers: 3,
      skills: ["Blockchain", "Solidity", "Web3", "React"],
      description:
        "Creating a secure decentralized voting system using blockchain technology",
      lookingFor: ["Blockchain Developer", "Security Specialist"],
      teamCode: "BB2024",
      isPublic: true,
    },
  ];

  const requiredSkills = [
    "Frontend Development",
    "Backend Development",
    "Database Design",
    "UI/UX Design",
    "Project Management",
    "Testing",
  ];

  const filteredStudents = availableStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  if (mode === "join") {
    return (
      <div className="p-6 max-w-6xl mx-auto">
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Join a Team</h1>
              <p className="text-muted-foreground">
                Find and join existing teams or respond to invitations
              </p>
            </div>
            <Button variant="outline" onClick={() => setMode("create")}>
              <UserPlus className="h-4 w-4 mr-2" />
              Create Team Instead
            </Button>
          </div>
        </div>

        <Tabs defaultValue="invitations" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="invitations">
              Invitations (
              {
                receivedInvitations.filter((inv) => inv.status === "pending")
                  .length
              }
              )
            </TabsTrigger>
            <TabsTrigger value="public">Public Teams</TabsTrigger>
            <TabsTrigger value="code">Join with Code</TabsTrigger>
          </TabsList>

          {/* Received Invitations */}
          <TabsContent value="invitations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Invitations</CardTitle>
                <CardDescription>
                  Respond to team invitations you've received
                </CardDescription>
              </CardHeader>
              <CardContent>
                {receivedInvitations.length === 0 ? (
                  <div className="text-center py-8">
                    <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      No invitations yet
                    </h3>
                    <p className="text-muted-foreground">
                      You'll see team invitations here when you receive them
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {receivedInvitations.map((invitation) => (
                      <Card
                        key={invitation.id}
                        className="border-l-4 border-l-primary"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <Avatar>
                                  <AvatarImage
                                    src={
                                      invitation.teamLeadAvatar ||
                                      "/placeholder.svg"
                                    }
                                  />
                                  <AvatarFallback>
                                    {invitation.teamLead
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-semibold text-lg">
                                    {invitation.teamName}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    Led by {invitation.teamLead} •{" "}
                                    {invitation.teamLeadEmail}
                                  </p>
                                </div>
                                <Badge
                                  variant={
                                    invitation.status === "pending"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="ml-auto"
                                >
                                  {invitation.status === "pending"
                                    ? "New"
                                    : "Viewed"}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <h4 className="font-medium mb-2">Project</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {invitation.projectTitle}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">
                                    Team Size
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {invitation.memberCount}/
                                    {invitation.maxMembers} members
                                  </p>
                                </div>
                              </div>

                              <div className="mb-4">
                                <h4 className="font-medium mb-2">
                                  Description
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {invitation.description}
                                </p>
                              </div>

                              <div className="mb-4">
                                <h4 className="font-medium mb-2">
                                  Required Skills
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {invitation.skills.map((skill) => (
                                    <Badge key={skill} variant="outline">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <p className="text-xs text-muted-foreground">
                                  Invited on{" "}
                                  {new Date(
                                    invitation.invitedDate
                                  ).toLocaleDateString()}
                                </p>
                                <div className="flex gap-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl">
                                      <DialogHeader>
                                        <DialogTitle>
                                          {invitation.teamName} - Team Details
                                        </DialogTitle>
                                        <DialogDescription>
                                          Complete information about this team
                                          invitation
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <h4 className="font-medium mb-2">
                                              Team Lead
                                            </h4>
                                            <div className="flex items-center gap-2">
                                              <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                  src={
                                                    invitation.teamLeadAvatar ||
                                                    "/placeholder.svg"
                                                  }
                                                />
                                                <AvatarFallback>
                                                  {invitation.teamLead
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                                </AvatarFallback>
                                              </Avatar>
                                              <div>
                                                <p className="text-sm font-medium">
                                                  {invitation.teamLead}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                  {invitation.teamLeadEmail}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div>
                                            <h4 className="font-medium mb-2">
                                              Team Code
                                            </h4>
                                            <Badge
                                              variant="outline"
                                              className="font-mono"
                                            >
                                              {invitation.teamCode}
                                            </Badge>
                                          </div>
                                        </div>
                                        <div>
                                          <h4 className="font-medium mb-2">
                                            Project Description
                                          </h4>
                                          <p className="text-sm text-muted-foreground">
                                            {invitation.description}
                                          </p>
                                        </div>
                                        <div className="flex gap-2 pt-4">
                                          <Button
                                            className="flex-1"
                                            onClick={() =>
                                              handleRespondToInvitation(
                                                invitation.id,
                                                "accept"
                                              )
                                            }
                                          >
                                            <Check className="h-4 w-4 mr-2" />
                                            Accept Invitation
                                          </Button>
                                          <Button
                                            variant="outline"
                                            onClick={() =>
                                              handleRespondToInvitation(
                                                invitation.id,
                                                "decline"
                                              )
                                            }
                                          >
                                            <X className="h-4 w-4 mr-2" />
                                            Decline
                                          </Button>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleRespondToInvitation(
                                        invitation.id,
                                        "accept"
                                      )
                                    }
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    Accept
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleRespondToInvitation(
                                        invitation.id,
                                        "decline"
                                      )
                                    }
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    Decline
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Public Teams */}
          <TabsContent value="public" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Public Teams Looking for Members</CardTitle>
                <CardDescription>
                  Browse teams that are actively recruiting new members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {publicTeams.map((team) => (
                    <Card key={team.id} className="border">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar>
                                <AvatarImage
                                  src={
                                    team.teamLeadAvatar || "/placeholder.svg"
                                  }
                                />
                                <AvatarFallback>
                                  {team.teamLead
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {team.teamName}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  Led by {team.teamLead} • {team.teamLeadEmail}
                                </p>
                              </div>
                              <Badge variant="outline" className="ml-auto">
                                {team.memberCount}/{team.maxMembers} members
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <h4 className="font-medium mb-2">Project</h4>
                                <p className="text-sm text-muted-foreground">
                                  {team.projectTitle}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">
                                  Looking For
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {team.lookingFor.map((role) => (
                                    <Badge
                                      key={role}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {role}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="mb-4">
                              <h4 className="font-medium mb-2">Description</h4>
                              <p className="text-sm text-muted-foreground">
                                {team.description}
                              </p>
                            </div>

                            <div className="mb-4">
                              <h4 className="font-medium mb-2">
                                Skills & Technologies
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {team.skills.map((skill) => (
                                  <Badge key={skill} variant="outline">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="font-mono">
                                Code: {team.teamCode}
                              </Badge>
                              <Button onClick={() => handleJoinTeam(team)}>
                                <UserPlus className="h-4 w-4 mr-2" />
                                Request to Join
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Join with Code */}
          <TabsContent value="code" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Join Team with Code</CardTitle>
                <CardDescription>
                  Enter a team code to join a specific team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="team-code">Team Code</Label>
                    <div className="flex gap-2">
                      <Input
                        id="team-code"
                        placeholder="Enter team code (e.g., ABC123)"
                        value={teamCode}
                        onChange={(e) =>
                          setTeamCode(e.target.value.toUpperCase())
                        }
                        className="font-mono"
                      />
                      <Button
                        onClick={handleJoinWithCode}
                        disabled={!teamCode.trim()}
                      >
                        <Key className="h-4 w-4 mr-2" />
                        Join
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Team codes are usually 6 characters long and provided by
                      team leaders
                    </p>
                  </div>

                  <Separator />

                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <QrCode className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Or scan QR code
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      Open Camera to Scan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Original create team flow
  return (
    <div className="p-6 max-w-6xl mx-auto">
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Create Your Team</h1>
            <p className="text-muted-foreground">
              Build your perfect team for the semester project
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              if (user?.team) {
                toast.error(
                  "You already have a team. Please leave it before joining a new one."
                );
                return;
              }
              setMode("join");
            }}
          >
            <Users className="h-4 w-4 mr-2" />
            Join Team Instead
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep >= step.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step.completed ? <CheckCircle className="h-4 w-4" /> : step.id}
              </div>
              <span
                className={`ml-2 text-sm ${
                  currentStep >= step.id
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`mx-4 h-px w-12 ${
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <Progress value={(currentStep / steps.length) * 100} className="h-2" />
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Details */}
          <Card>
            <CardHeader>
              <CardTitle>Team Details</CardTitle>
              <CardDescription>
                Set up your team's basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="team-name">Team Name *</Label>
                <Input
                  id="team-name"
                  placeholder="Enter your team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Choose a unique and memorable name
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="team-description">Team Description *</Label>
                <Textarea
                  id="team-description"
                  placeholder="Describe your team's mission and goals"
                  value={teamDescription}
                  onChange={(e) => setTeamDescription(e.target.value)}
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  {teamDescription.length}/500 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label>Team Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 overflow-hidden bg-muted">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Team Logo"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Camera className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>

                  <div>
                    <input
                      id="team-logo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <Label htmlFor="team-logo">
                      <Button asChild variant="outline" size="sm">
                        <span>Upload Logo</span>
                      </Button>
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Lead Profile</CardTitle>
              <CardDescription>Your information as team leader</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/?height=64&width=64" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {user?.academicYear} • {user?.department}
                  </p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Skills & Expertise</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Node.js",
                    "Python",
                    "Leadership",
                    "Project Management",
                  ].map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Leadership Experience</Label>
                <p className="text-sm text-muted-foreground">
                  Led 2 previous semester projects with 4.8/5 average team
                  satisfaction rating
                </p>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <Tabs defaultValue="invite" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="invite">Invite Members</TabsTrigger>
              <TabsTrigger value="search">Search Directory</TabsTrigger>
              <TabsTrigger value="pending">Pending Invitations</TabsTrigger>
            </TabsList>
            <TabsContent value="invite" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Invite Team Members</CardTitle>
                  <CardDescription>
                    Send invitations to potential team members
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter email address"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Send Invite
                    </Button>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Invitation Link</Label>
                      <div className="flex gap-2">
                        <Input
                          value={inviteLink}
                          readOnly
                          disabled={!teamName}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!teamName}
                          onClick={handleCopy}
                        >
                          {copied ? (
                            <>
                              <Check className="mr-1 h-4 w-4" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-1 h-4 w-4" /> Copy
                            </>
                          )}
                        </Button>
                      </div>
                      {!teamName ? (
                        <p className="text-xs text-red-500">
                          Enter team name for creating a valid invitation link
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    {/* <div className="space-y-2">
                      <Label>QR Code</Label>
                      <div className="flex items-center gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded border">
                          <QrCode className="h-6 w-6" />
                        </div>
                        <Button variant="outline" size="sm">
                          Generate QR
                        </Button>
                      </div>
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="search" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Directory</CardTitle>
                  <CardDescription>
                    Search and invite students from your university
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search by name, skills, or major"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        <SelectItem value="freshman">Freshman</SelectItem>
                        <SelectItem value="sophomore">Sophomore</SelectItem>
                        <SelectItem value="junior">Junior</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    {filteredStudents.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={student.avatar || "/"} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {student.year} • {student.major}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {student.skills.slice(0, 3).map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))}
                              {student.skills.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{student.skills.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              student.availability === "Available"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {student.availability}
                          </Badge>
                          <Button
                            size="sm"
                            disabled={student.availability !== "Available"}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Invite
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pending" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Invitations</CardTitle>
                  <CardDescription>Track your sent invitations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingInvitations.map((invitation, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{invitation.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {invitation.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Sent: {invitation.sentDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              invitation.status === "Viewed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {invitation.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Resend
                          </Button>
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {currentStep === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
              <CardDescription>
                Define the skills your team needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {requiredSkills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={selectedSkills.includes(skill)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(skill, !!checked)
                      }
                    />
                    <Label htmlFor={skill} className="text-sm">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Team Composition</CardTitle>
              <CardDescription>Current team overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Team Size</span>
                  <span>1/4 members</span>
                </div>
                <Progress value={25} />
              </div>
              <div className="space-y-2">
                <Label>Current Members</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 border rounded">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/?height=32&width=32" />
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Alex Smith</p>
                      <p className="text-xs text-muted-foreground">Team Lead</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Skill Coverage</Label>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Frontend Development</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Backend Development</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>UI/UX Design</span>
                    <span className="text-red-600">✗</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Database Design</span>
                    <span className="text-red-600">✗</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Team Agreement</CardTitle>
            <CardDescription>
              Establish team rules and guidelines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Communication Protocols</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Daily check-ins via team chat</li>
                  <li>• Weekly team meetings every Tuesday at 3 PM</li>
                  <li>
                    • Response time: within 24 hours for non-urgent matters
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Work Distribution</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Tasks assigned based on skills and availability</li>
                  <li>• Equal contribution expected from all members</li>
                  <li>• Peer review required for major deliverables</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Meeting Guidelines</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Attendance required for all scheduled meetings</li>
                  <li>• 24-hour notice required for absence</li>
                  <li>• Meeting notes shared within 24 hours</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Conflict Resolution</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Direct communication encouraged for minor issues</li>
                  <li>• Team lead mediation for unresolved conflicts</li>
                  <li>• Professor involvement as last resort</li>
                </ul>
              </div>
            </div>
            {/* <div className="flex items-center space-x-2">
              <Checkbox id="agreement" />
              <Label htmlFor="agreement" className="text-sm">
                I agree to the team guidelines and commit to being a
                collaborative team member
              </Label>
            </div> */}
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            if (user?.team) {
              toast.error("You are already part of a team.");
              return;
            }
            if (currentStep === steps.length) {
              createTeam();
            } else {
              setCurrentStep(Math.min(steps.length, currentStep + 1));
            }
          }}
        >
          {currentStep === steps.length ? "Complete Team Formation" : "Next"}
        </Button>
      </div>
    </div>
  );
}

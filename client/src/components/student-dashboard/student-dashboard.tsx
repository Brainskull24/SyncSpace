"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Loader2,
  MessageSquare,
  Plus,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useUser } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
}

export function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const stats = [
    {
      title: "Team Status",
      value: user.isTeamAlloted ? "Active" : "No Team",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Active Projects",
      value: "1",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Completed Phases",
      value: "3",
      icon: CheckCircle,
      color: "text-purple-600",
    },
    {
      title: "Upcoming Deadlines",
      value: "5",
      icon: Clock,
      color: "text-orange-600",
    },
  ];

  const teamMembers = [
    {
      name: "Alex Smith",
      role: "Team Lead",
      avatar: "/?height=32&width=32",
      status: "online",
    },
    {
      name: "Sarah Johnson",
      role: "Developer",
      avatar: "/?height=32&width=32",
      status: "online",
    },
    {
      name: "Mike Chen",
      role: "Designer",
      avatar: "/?height=32&width=32",
      status: "away",
    },
    {
      name: "Emma Davis",
      role: "Developer",
      avatar: "/?height=32&width=32",
      status: "offline",
    },
  ];

  const phases = [
    {
      name: "Research & Planning",
      status: "completed",
      description: "Initial research and project planning",
    },
    {
      name: "Design & Prototyping",
      status: "completed",
      description: "UI/UX design and prototyping",
    },
    {
      name: "Development",
      status: "current",
      description: "Core development and implementation",
    },
    {
      name: "Testing & QA",
      status: "upcoming",
      description: "Testing and quality assurance",
    },
    {
      name: "Deployment",
      status: "upcoming",
      description: "Final deployment and presentation",
    },
  ];

  const tasks = [
    {
      title: "Implement user authentication",
      assignedBy: "Prof. Johnson",
      dueDate: "2024-01-15",
      status: "In Progress",
      priority: "High",
    },
    {
      title: "Design database schema",
      assignedBy: "Alex Smith",
      dueDate: "2024-01-18",
      status: "Not Started",
      priority: "Medium",
    },
    {
      title: "Create API documentation",
      assignedBy: "Prof. Johnson",
      dueDate: "2024-01-20",
      status: "Completed",
      priority: "Low",
    },
  ];

  const activities = [
    {
      type: "submission",
      message: "Phase 2 submitted successfully",
      time: "2 hours ago",
    },
    {
      type: "feedback",
      message: "Professor feedback received on Phase 1",
      time: "1 day ago",
    },
    { type: "team", message: "Sarah joined the team chat", time: "2 days ago" },
    {
      type: "deadline",
      message: "New deadline set for Phase 3",
      time: "3 days ago",
    },
  ];

  const deadlines = [
    {
      title: "Phase 3 Submission",
      date: "2024-01-15",
      type: "Phase",
      urgency: "urgent",
    },
    {
      title: "Team Meeting",
      date: "2024-01-16",
      type: "Meeting",
      urgency: "soon",
    },
    {
      title: "Individual Task Review",
      date: "2024-01-20",
      type: "Task",
      urgency: "normal",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user.firstName}! 👋
          </h1>
          <p className="text-muted-foreground">
            {user.academicYear} • {user.department} •{" "}
            {user.isTeamAlloted ? user.isTeamLead : "No Team"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Team Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                My Team
              </CardTitle>
              <CardDescription>Team Alpha • Formed Sept 2024</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Team Performance</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>
              <div className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar || "/"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                          member.status === "online"
                            ? "bg-green-500"
                            : member.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => onNavigate("team-formation")}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Team Chat
              </Button>
            </CardContent>
          </Card>

          {/* Current Project */}
          <Card>
            <CardHeader>
              <CardTitle>Active Project</CardTitle>
              <CardDescription>E-Learning Platform Development</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/?height=40&width=40" />
                  <AvatarFallback>PJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Prof. Johnson</p>
                  <p className="text-sm text-muted-foreground">
                    Computer Science
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>65%</span>
                </div>
                <Progress value={65} />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Next Deadline: Jan 15, 2024</span>
              </div>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => onNavigate("browse-projects")}
              >
                View Project Details
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Center Column */}
        <div className="space-y-6">
          {/* Phase Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Project Phases</CardTitle>
              <CardDescription>Track your project progression</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {phases.map((phase, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        phase.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : phase.status === "current"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {phase.status === "completed" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-medium ${
                          phase.status === "current" ? "text-blue-600" : ""
                        }`}
                      >
                        {phase.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {phase.description}
                      </p>
                    </div>
                    {phase.status === "current" && (
                      <Badge variant="default">Current</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Tasks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Tasks</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Assigned by {task.assignedBy}
                        </p>
                      </div>
                      <Badge
                        variant={
                          task.priority === "High"
                            ? "destructive"
                            : task.priority === "Medium"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Due: {task.dueDate}
                      </span>
                      <Badge
                        variant={
                          task.status === "Completed"
                            ? "default"
                            : task.status === "In Progress"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {task.status}
                      </Badge>
                    </div>
                    {index < tasks.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        activity.type === "submission"
                          ? "bg-green-100 text-green-600"
                          : activity.type === "feedback"
                          ? "bg-blue-100 text-blue-600"
                          : activity.type === "team"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {activity.type === "submission" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : activity.type === "feedback" ? (
                        <MessageSquare className="h-4 w-4" />
                      ) : activity.type === "team" ? (
                        <Users className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        deadline.urgency === "urgent"
                          ? "bg-red-500"
                          : deadline.urgency === "soon"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{deadline.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {deadline.date} • {deadline.type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                My Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Task Completion Rate</span>
                  <span>85%</span>
                </div>
                <Progress value={85} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Team Contribution</span>
                  <span>92%</span>
                </div>
                <Progress value={92} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Overall Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">4.6/5.0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

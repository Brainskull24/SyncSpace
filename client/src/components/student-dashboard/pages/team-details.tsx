"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  ArrowLeft,
  Github,
  Linkedin,
} from "lucide-react";
import { Page } from "@/types/student-pages";
import { useUser } from "@/context/Authcontext";

const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Lead Developer",
    department: "Engineering",
    email: "sarah.johnson@syncspace.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "Jan 2022",
    status: "online",
    avatar: "/placeholder.svg?height=100&width=100",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    projects: ["E-commerce Platform", "Mobile App", "API Gateway"],
    bio: "Experienced full-stack developer with 8+ years in web technologies. Passionate about clean code and mentoring junior developers.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "UI/UX Designer",
    department: "Design",
    email: "michael.chen@syncspace.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    joinDate: "Mar 2022",
    status: "online",
    avatar: "/placeholder.svg?height=100&width=100",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    projects: ["Design System", "Mobile App", "Dashboard Redesign"],
    bio: "Creative designer focused on user-centered design principles. Specializes in creating intuitive and accessible digital experiences.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Project Manager",
    department: "Operations",
    email: "emily.rodriguez@syncspace.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    joinDate: "Jun 2021",
    status: "away",
    avatar: "/placeholder.svg?height=100&width=100",
    skills: ["Agile", "Scrum", "Jira", "Team Leadership"],
    projects: ["E-commerce Platform", "Client Portal", "Internal Tools"],
    bio: "Certified Scrum Master with expertise in agile methodologies. Dedicated to delivering projects on time and fostering team collaboration.",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Backend Developer",
    department: "Engineering",
    email: "david.kim@syncspace.com",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    joinDate: "Sep 2022",
    status: "online",
    avatar: "/placeholder.svg?height=100&width=100",
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    projects: ["API Gateway", "Data Pipeline", "Authentication Service"],
    bio: "Backend specialist with strong database design skills. Focuses on building scalable and secure server-side applications.",
  },
];

interface TeamDetailsProps {
  onNavigate: (page: Page) => void;
}

export default function TeamPage({ onNavigate }: TeamDetailsProps) {
  const { user } = useUser();
  const teamDetails = user?.team;
  
  const onlineMembers = teamMembers.filter(
    (member) => member.status === "online"
  ).length;
  const departments = [
    ...new Set(teamMembers.map((member) => member.department)),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Details</h1>
            <p className="text-gray-600">
              Meet our talented team members and their expertise
            </p>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Members
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamMembers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Online Now</CardTitle>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{onlineMembers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departments.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2y</div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                      />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        member.status === "online"
                          ? "bg-green-500"
                          : member.status === "away"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {member.role}
                    </CardDescription>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {member.department}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{member.bio}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{member.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {member.joinDate}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Active Projects</h4>
                  <div className="space-y-1">
                    {member.projects.slice(0, 2).map((project) => (
                      <div key={project} className="text-xs text-gray-600">
                        • {project}
                      </div>
                    ))}
                    {member.projects.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{member.projects.length - 2} more
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Mail className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                  <Button size="sm" variant="outline">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

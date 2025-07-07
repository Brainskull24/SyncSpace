"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Download, Eye, Filter, MoreHorizontal, Search, Star, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { ApplicationModal } from "@/components/application-modal"

export default function TeamApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedApplications, setSelectedApplications] = useState<number[]>([])
  const [selectedApplication, setSelectedApplication] = useState<any>(null)

  const applications = [
    {
      id: 1,
      teamName: "Code Crusaders",
      teamLead: "Sarah Johnson",
      teamSize: 4,
      submissionDate: "2024-11-01",
      status: "pending",
      skillMatch: 92,
      project: "E-Commerce Platform",
      members: [
        { name: "Sarah Johnson", role: "Team Lead", skills: ["React", "Node.js", "MongoDB"] },
        { name: "Mike Chen", role: "Frontend Dev", skills: ["React", "TypeScript", "CSS"] },
        { name: "Alex Rivera", role: "Backend Dev", skills: ["Node.js", "Express", "PostgreSQL"] },
        { name: "Emma Davis", role: "UI/UX Designer", skills: ["Figma", "Adobe XD", "Prototyping"] },
      ],
      proposal: "We propose to build a comprehensive e-commerce platform with modern web technologies...",
      experience: "Previous projects include a task management app and a social media dashboard.",
    },
    {
      id: 2,
      teamName: "Tech Titans",
      teamLead: "David Park",
      teamSize: 5,
      submissionDate: "2024-10-28",
      status: "accepted",
      skillMatch: 88,
      project: "E-Commerce Platform",
      members: [
        { name: "David Park", role: "Team Lead", skills: ["Vue.js", "Python", "Django"] },
        { name: "Lisa Wong", role: "Frontend Dev", skills: ["Vue.js", "JavaScript", "SCSS"] },
        { name: "Tom Wilson", role: "Backend Dev", skills: ["Python", "Django", "Redis"] },
        { name: "Anna Kim", role: "DevOps", skills: ["Docker", "AWS", "CI/CD"] },
        { name: "Jake Miller", role: "QA Engineer", skills: ["Jest", "Cypress", "Testing"] },
      ],
      proposal: "Our team will leverage modern frameworks and cloud technologies to deliver a scalable solution...",
      experience: "Combined 15+ years of experience across web development and cloud infrastructure.",
    },
    {
      id: 3,
      teamName: "AI Innovators",
      teamLead: "Priya Patel",
      teamSize: 3,
      submissionDate: "2024-11-03",
      status: "pending",
      skillMatch: 95,
      project: "E-Commerce Platform",
      members: [
        { name: "Priya Patel", role: "Team Lead", skills: ["Python", "Machine Learning", "TensorFlow"] },
        { name: "Carlos Rodriguez", role: "Full Stack Dev", skills: ["React", "Python", "FastAPI"] },
        { name: "Zoe Chen", role: "Data Scientist", skills: ["Python", "Pandas", "Scikit-learn"] },
      ],
      proposal: "We aim to integrate AI-powered recommendations and intelligent search capabilities...",
      experience: "Specialized in AI/ML applications with focus on recommendation systems.",
    },
    {
      id: 4,
      teamName: "Web Warriors",
      teamLead: "Marcus Thompson",
      teamSize: 4,
      submissionDate: "2024-10-25",
      status: "rejected",
      skillMatch: 65,
      project: "E-Commerce Platform",
      members: [
        { name: "Marcus Thompson", role: "Team Lead", skills: ["HTML", "CSS", "JavaScript"] },
        { name: "Jenny Liu", role: "Designer", skills: ["Photoshop", "Illustrator"] },
        { name: "Ryan O'Connor", role: "Developer", skills: ["jQuery", "PHP"] },
        { name: "Mia Garcia", role: "Content", skills: ["Writing", "SEO"] },
      ],
      proposal: "Basic e-commerce website with standard features and simple design...",
      experience: "New team with limited project experience but high enthusiasm.",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSkillMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.teamLead.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSelectApplication = (id: number) => {
    setSelectedApplications((prev) => (prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <nav className="text-sm text-gray-600 mb-1">Dashboard &gt; E-Commerce Platform &gt; Team Applications</nav>
            <h1 className="text-2xl font-bold text-gray-900">Team Applications Review</h1>
            <p className="text-sm text-gray-600">E-Commerce Platform Project</p>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{applications.length}</div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {applications.filter((app) => app.status === "pending").length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {applications.filter((app) => app.status === "accepted").length}
              </div>
              <div className="text-sm text-gray-600">Accepted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {applications.filter((app) => app.status === "rejected").length}
              </div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" disabled={selectedApplications.length === 0}>
              Accept Selected ({selectedApplications.length})
            </Button>
            <Button variant="outline" disabled={selectedApplications.length === 0}>
              Reject Selected ({selectedApplications.length})
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search teams or members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedApplications.includes(application.id)}
                      onCheckedChange={() => handleSelectApplication(application.id)}
                    />
                    <Avatar>
                      <AvatarFallback>{application.teamName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{application.teamName}</CardTitle>
                      <CardDescription>{application.teamLead}</CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedApplication(application)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Accept Application</DropdownMenuItem>
                      <DropdownMenuItem>Reject Application</DropdownMenuItem>
                      <DropdownMenuItem>Request More Info</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(application.status)}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className={`h-4 w-4 ${getSkillMatchColor(application.skillMatch)}`} />
                      <span className={`text-sm font-medium ${getSkillMatchColor(application.skillMatch)}`}>
                        {application.skillMatch}% match
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{application.teamSize} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(application.submissionDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Team Members</h4>
                    <div className="flex -space-x-2">
                      {application.members.slice(0, 4).map((member, index) => (
                        <Avatar key={index} className="h-8 w-8 border-2 border-white">
                          <AvatarFallback className="text-xs">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {application.members.length > 4 && (
                        <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                          <span className="text-xs font-medium">+{application.members.length - 4}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => setSelectedApplication(application)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    {application.status === "pending" && (
                      <>
                        <Button size="sm" variant="outline">
                          Accept
                        </Button>
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <ApplicationModal application={selectedApplication} onClose={() => setSelectedApplication(null)} />
      )}
    </div>
  )
}

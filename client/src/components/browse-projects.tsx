"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Filter, Heart, Search, Star, Users, X, Eye, Send } from "lucide-react"

interface BrowseProjectsProps {
  onNavigate: (page: string) => void
}

export function BrowseProjects({ onNavigate }: BrowseProjectsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])

  const projects = [
    {
      id: 1,
      title: "E-Learning Platform Development",
      category: "Web Development",
      description:
        "Build a comprehensive online learning management system with interactive features, video streaming, and progress tracking.",
      technologies: ["React", "Node.js", "MongoDB", "WebRTC"],
      difficulty: "Intermediate",
      professor: {
        name: "Prof. Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        department: "Computer Science",
      },
      teamSize: "4-5 members",
      duration: "12 weeks",
      deadline: "2024-01-20",
      applicants: 12,
      maxTeams: 3,
      industry: true,
      objectives: [
        "Develop user authentication and authorization system",
        "Implement video streaming and interactive content delivery",
        "Create comprehensive progress tracking and analytics",
        "Design responsive and accessible user interface",
      ],
      phases: [
        { name: "Research & Planning", duration: "2 weeks", description: "Market research and technical planning" },
        { name: "Design & Prototyping", duration: "3 weeks", description: "UI/UX design and system architecture" },
        { name: "Core Development", duration: "5 weeks", description: "Backend and frontend implementation" },
        { name: "Testing & Deployment", duration: "2 weeks", description: "Quality assurance and deployment" },
      ],
      requirements: {
        technical: ["JavaScript/TypeScript", "React or Vue.js", "Node.js", "Database Design"],
        preferred: ["WebRTC", "Video Processing", "Cloud Services", "DevOps"],
        academic: ["Web Development Course", "Database Systems"],
        time: "15-20 hours per week",
      },
    },
    {
      id: 2,
      title: "Mobile Health Tracking App",
      category: "Mobile Development",
      description:
        "Create a comprehensive health and fitness tracking application with wearable device integration and AI-powered insights.",
      technologies: ["React Native", "Python", "TensorFlow", "Firebase"],
      difficulty: "Advanced",
      professor: {
        name: "Dr. Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        department: "Software Engineering",
      },
      teamSize: "5-6 members",
      duration: "14 weeks",
      deadline: "2024-01-18",
      applicants: 8,
      maxTeams: 2,
      industry: true,
      objectives: [
        "Develop cross-platform mobile application",
        "Integrate with popular fitness wearables",
        "Implement AI-powered health insights",
        "Create comprehensive data visualization",
      ],
      phases: [
        { name: "Research & Planning", duration: "2 weeks", description: "Health domain research and planning" },
        { name: "Mobile App Development", duration: "6 weeks", description: "Core mobile application development" },
        { name: "AI Integration", duration: "4 weeks", description: "Machine learning model integration" },
        { name: "Testing & Optimization", duration: "2 weeks", description: "Performance optimization and testing" },
      ],
      requirements: {
        technical: ["React Native or Flutter", "Python", "Machine Learning", "Mobile Development"],
        preferred: ["TensorFlow", "Health APIs", "Wearable Integration", "Data Visualization"],
        academic: ["Mobile Development", "Machine Learning Fundamentals"],
        time: "20-25 hours per week",
      },
    },
    {
      id: 3,
      title: "Smart Campus IoT System",
      category: "IoT & Hardware",
      description:
        "Design and implement an IoT system for smart campus management including energy monitoring, security, and environmental controls.",
      technologies: ["Arduino", "Raspberry Pi", "Python", "MQTT", "React"],
      difficulty: "Advanced",
      professor: {
        name: "Prof. Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        department: "Electrical Engineering",
      },
      teamSize: "6-8 members",
      duration: "16 weeks",
      deadline: "2024-01-25",
      applicants: 6,
      maxTeams: 1,
      industry: false,
      objectives: [
        "Design IoT sensor network architecture",
        "Develop real-time monitoring dashboard",
        "Implement automated control systems",
        "Create data analytics and reporting",
      ],
      phases: [
        { name: "System Design", duration: "3 weeks", description: "IoT architecture and component selection" },
        { name: "Hardware Development", duration: "6 weeks", description: "Sensor deployment and hardware setup" },
        { name: "Software Integration", duration: "5 weeks", description: "Dashboard and control system development" },
        { name: "Testing & Deployment", duration: "2 weeks", description: "System testing and campus deployment" },
      ],
      requirements: {
        technical: ["IoT Protocols", "Python", "Hardware Programming", "Web Development"],
        preferred: ["Arduino/Raspberry Pi", "MQTT", "Sensor Networks", "Data Analytics"],
        academic: ["Embedded Systems", "Network Programming"],
        time: "18-22 hours per week",
      },
    },
  ]

  const categories = ["All", "Web Development", "Mobile Development", "AI/ML", "IoT & Hardware", "Data Science"]
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]
  const technologies = ["React", "Node.js", "Python", "MongoDB", "React Native", "TensorFlow", "Arduino", "Firebase"]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSearch
  })

  const toggleWishlist = (projectId: number) => {
    setWishlist((prev) => (prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]))
  }

  const getUrgencyColor = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    if (days <= 3) return "text-red-600"
    if (days <= 7) return "text-yellow-600"
    return "text-green-600"
  }

  const getUrgencyBadge = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    if (days <= 3) return { variant: "destructive" as const, text: "Urgent" }
    if (days <= 7) return { variant: "default" as const, text: "Soon" }
    return { variant: "secondary" as const, text: "Open" }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={() => onNavigate("dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Available Projects</h1>
            <p className="text-muted-foreground">Discover and apply to exciting semester projects</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{filteredProjects.length} projects found</span>
          </div>
        </div>
      </div>

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
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
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
                <SelectItem value="popular">Most Popular</SelectItem>
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
                        <SelectItem key={category} value={category.toLowerCase()}>
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
                        <SelectItem key={difficulty} value={difficulty.toLowerCase()}>
                          {difficulty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Team Size</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">2-3 members</SelectItem>
                      <SelectItem value="medium">4-5 members</SelectItem>
                      <SelectItem value="large">6+ members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Industry Partnership</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
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
          <Card key={project.id} className="flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{project.category}</Badge>
                    <Badge {...getUrgencyBadge(project.deadline)}>{getUrgencyBadge(project.deadline).text}</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
                </div>
                <Button variant="ghost" size="sm" onClick={() => toggleWishlist(project.id)} className="shrink-0">
                  <Heart className={`h-4 w-4 ${wishlist.includes(project.id) ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>
              <CardDescription className="line-clamp-3">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={project.professor.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {project.professor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{project.professor.name}</p>
                  <p className="text-xs text-muted-foreground">{project.professor.department}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Team Size:</span>
                  <span>{project.teamSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{project.duration}</span>
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
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Deadline:</span>
                  <span className={getUrgencyColor(project.deadline)}>
                    {new Date(project.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{project.applicants} teams applied</span>
                {project.industry && (
                  <>
                    <Separator orientation="vertical" className="h-4" />
                    <Badge variant="outline" className="text-xs">
                      Industry Partner
                    </Badge>
                  </>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Applications</span>
                  <span>
                    {project.applicants}/{project.maxTeams * 5}
                  </span>
                </div>
                <Progress value={(project.applicants / (project.maxTeams * 5)) * 100} className="h-1" />
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
                      <Badge variant="outline">{project.category}</Badge>
                    </DialogTitle>
                    <DialogDescription>{project.description}</DialogDescription>
                  </DialogHeader>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="requirements">Requirements</TabsTrigger>
                      <TabsTrigger value="timeline">Timeline</TabsTrigger>
                      <TabsTrigger value="professor">Professor</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Project Objectives</h4>
                          <ul className="text-sm space-y-1">
                            {project.objectives.map((objective, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                {objective}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Technology Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                        <div className="text-center">
                          <p className="text-2xl font-bold">{project.teamSize}</p>
                          <p className="text-sm text-muted-foreground">Team Size</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold">{project.duration}</p>
                          <p className="text-sm text-muted-foreground">Duration</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold">{project.difficulty}</p>
                          <p className="text-sm text-muted-foreground">Difficulty</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="requirements" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Required Technical Skills</h4>
                            <div className="space-y-2">
                              {project.requirements.technical.map((skill) => (
                                <div key={skill} className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-red-500" />
                                  <span className="text-sm">{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Preferred Skills</h4>
                            <div className="space-y-2">
                              {project.requirements.preferred.map((skill) => (
                                <div key={skill} className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-green-500" />
                                  <span className="text-sm">{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Academic Prerequisites</h4>
                            <div className="space-y-2">
                              {project.requirements.academic.map((req) => (
                                <div key={req} className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                                  <span className="text-sm">{req}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Time Commitment</h4>
                            <p className="text-sm text-muted-foreground">{project.requirements.time}</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="timeline" className="space-y-4">
                      <div className="space-y-4">
                        {project.phases.map((phase, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                                {index + 1}
                              </div>
                              {index < project.phases.length - 1 && <div className="h-12 w-px bg-border mt-2" />}
                            </div>
                            <div className="flex-1 pb-8">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{phase.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {phase.duration}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{phase.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="professor" className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={project.professor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {project.professor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{project.professor.name}</h3>
                          <p className="text-muted-foreground">{project.professor.department}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-muted-foreground ml-2">4.9/5.0 (24 reviews)</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Research Interests</h4>
                          <p className="text-sm text-muted-foreground">
                            Web technologies, distributed systems, and educational technology. Published 15+ papers in
                            top-tier conferences and journals.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Supervision Style</h4>
                          <p className="text-sm text-muted-foreground">
                            Collaborative and supportive approach with weekly check-ins and hands-on guidance.
                            Encourages innovation and creative problem-solving.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Office Hours</h4>
                          <p className="text-sm text-muted-foreground">
                            Tuesdays & Thursdays, 2:00 PM - 4:00 PM
                            <br />
                            Room 304, Computer Science Building
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                    <Button variant="outline" onClick={() => toggleWishlist(project.id)}>
                      <Heart
                        className={`h-4 w-4 ${wishlist.includes(project.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button className="flex-1">
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
                const project = projects.find((p) => p.id === projectId)
                return project ? (
                  <div key={projectId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">{project.professor.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{project.category}</Badge>
                      <Button variant="ghost" size="sm" onClick={() => toggleWishlist(projectId)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : null
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

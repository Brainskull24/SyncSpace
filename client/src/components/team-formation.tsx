"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Camera, CheckCircle, Mail, QrCode, Search, Send, X } from "lucide-react"

interface TeamFormationProps {
  onNavigate: (page: string) => void
}

export function TeamFormation({ onNavigate }: TeamFormationProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [teamName, setTeamName] = useState("")
  const [teamDescription, setTeamDescription] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const steps = [
    { id: 1, name: "Team Details", completed: false },
    { id: 2, name: "Invite Members", completed: false },
    { id: 3, name: "Skill Requirements", completed: false },
    { id: 4, name: "Team Agreement", completed: false },
  ]

  const availableStudents = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@university.edu",
      year: "Junior",
      major: "Computer Science",
      skills: ["React", "Node.js", "Python", "UI/UX"],
      avatar: "/placeholder.svg?height=40&width=40",
      availability: "Available",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.c@university.edu",
      year: "Senior",
      major: "Software Engineering",
      skills: ["Java", "Spring", "MongoDB", "DevOps"],
      avatar: "/placeholder.svg?height=40&width=40",
      availability: "Busy",
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma.d@university.edu",
      year: "Sophomore",
      major: "Computer Science",
      skills: ["JavaScript", "React", "CSS", "Design"],
      avatar: "/placeholder.svg?height=40&width=40",
      availability: "Available",
    },
  ]

  const pendingInvitations = [
    { name: "Sarah Johnson", email: "sarah.j@university.edu", status: "Pending", sentDate: "2024-01-10" },
    { name: "Mike Chen", email: "mike.c@university.edu", status: "Viewed", sentDate: "2024-01-09" },
  ]

  const requiredSkills = [
    "Frontend Development",
    "Backend Development",
    "Database Design",
    "UI/UX Design",
    "Project Management",
    "Testing",
  ]

  const filteredStudents = availableStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={() => onNavigate("dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        <h1 className="text-3xl font-bold">Create Your Team</h1>
        <p className="text-muted-foreground">Build your perfect team for the semester project</p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep >= step.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step.completed ? <CheckCircle className="h-4 w-4" /> : step.id}
              </div>
              <span className={`ml-2 text-sm ${currentStep >= step.id ? "text-foreground" : "text-muted-foreground"}`}>
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div className={`mx-4 h-px w-12 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />
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
              <CardDescription>Set up your team's basic information</CardDescription>
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
                <p className="text-xs text-muted-foreground">Choose a unique and memorable name</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="team-description">Team Description</Label>
                <Textarea
                  id="team-description"
                  placeholder="Describe your team's mission and goals"
                  value={teamDescription}
                  onChange={(e) => setTeamDescription(e.target.value)}
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">{teamDescription.length}/500 characters</p>
              </div>

              <div className="space-y-2">
                <Label>Team Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25">
                    <Camera className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <Button variant="outline" size="sm">
                    Upload Logo
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="communication">Preferred Communication Platform</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discord">Discord</SelectItem>
                    <SelectItem value="slack">Slack</SelectItem>
                    <SelectItem value="teams">Microsoft Teams</SelectItem>
                    <SelectItem value="built-in">Built-in Chat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Team Lead Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Team Lead Profile</CardTitle>
              <CardDescription>Your information as team leader</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Alex Smith</h3>
                  <p className="text-sm text-muted-foreground">Senior • Computer Science</p>
                  <p className="text-sm text-muted-foreground">alex.smith@university.edu</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Skills & Expertise</Label>
                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "Python", "Leadership", "Project Management"].map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Leadership Experience</Label>
                <p className="text-sm text-muted-foreground">
                  Led 2 previous semester projects with 4.8/5 average team satisfaction rating
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
                  <CardDescription>Send invitations to potential team members</CardDescription>
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
                        <Input value="https://syncspace.edu/join/team-alpha-xyz" readOnly />
                        <Button variant="outline" size="sm">
                          Copy
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>QR Code</Label>
                      <div className="flex items-center gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded border">
                          <QrCode className="h-6 w-6" />
                        </div>
                        <Button variant="outline" size="sm">
                          Generate QR
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="search" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Directory</CardTitle>
                  <CardDescription>Search and invite students from your university</CardDescription>
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
                      <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={student.avatar || "/placeholder.svg"} />
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
                                <Badge key={skill} variant="outline" className="text-xs">
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
                          <Badge variant={student.availability === "Available" ? "default" : "secondary"}>
                            {student.availability}
                          </Badge>
                          <Button size="sm" disabled={student.availability !== "Available"}>
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
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{invitation.name}</h4>
                          <p className="text-sm text-muted-foreground">{invitation.email}</p>
                          <p className="text-xs text-muted-foreground">Sent: {invitation.sentDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={invitation.status === "Viewed" ? "default" : "secondary"}>
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
              <CardDescription>Define the skills your team needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {requiredSkills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox id={skill} />
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
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
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
            <CardDescription>Establish team rules and guidelines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Communication Protocols</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Daily check-ins via team chat</li>
                  <li>• Weekly team meetings every Tuesday at 3 PM</li>
                  <li>• Response time: within 24 hours for non-urgent matters</li>
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

            <div className="flex items-center space-x-2">
              <Checkbox id="agreement" />
              <Label htmlFor="agreement" className="text-sm">
                I agree to the team guidelines and commit to being a collaborative team member
              </Label>
            </div>
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
            if (currentStep === steps.length) {
              onNavigate("dashboard")
            } else {
              setCurrentStep(Math.min(steps.length, currentStep + 1))
            }
          }}
        >
          {currentStep === steps.length ? "Complete Team Formation" : "Next"}
        </Button>
      </div>
    </div>
  )
}

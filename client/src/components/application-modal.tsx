"use client"

import { useState } from "react"
import { MessageSquare, CheckCircle, XCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface ApplicationModalProps {
  application: any
  onClose: () => void
}

export function ApplicationModal({ application, onClose }: ApplicationModalProps) {
  const [evaluation, setEvaluation] = useState({
    technical: [7],
    teamComposition: [8],
    projectUnderstanding: [6],
    communication: [7],
    innovation: [8],
  })
  const [feedback, setFeedback] = useState("")

  const overallScore = Math.round(
    (evaluation.technical[0] +
      evaluation.teamComposition[0] +
      evaluation.projectUnderstanding[0] +
      evaluation.communication[0] +
      evaluation.innovation[0]) /
      5,
  )

  const getSkillColor = (skill: string) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-orange-100 text-orange-800",
      "bg-pink-100 text-pink-800",
    ]
    return colors[skill.length % colors.length]
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">{application.teamName}</DialogTitle>
              <p className="text-sm text-gray-600">Team Lead: {application.teamLead}</p>
            </div>
            <Badge
              className={
                application.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : application.status === "accepted"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
              }
            >
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="proposal">Proposal</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Team Name</Label>
                    <p className="text-sm text-gray-600">{application.teamName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Team Lead</Label>
                    <p className="text-sm text-gray-600">{application.teamLead}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Team Size</Label>
                    <p className="text-sm text-gray-600">{application.teamSize} members</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Submission Date</Label>
                    <p className="text-sm text-gray-600">{new Date(application.submissionDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Team Mission</Label>
                  <p className="text-sm text-gray-600 mt-1">
                    "To deliver innovative and scalable solutions that exceed expectations while fostering collaborative
                    learning and professional growth."
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Previous Experience</Label>
                  <p className="text-sm text-gray-600 mt-1">{application.experience}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Skill Match Score</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={application.skillMatch} className="flex-1" />
                    <span className="text-sm font-medium">{application.skillMatch}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-4">
            <div className="grid gap-4">
              {application.members.map((member: any, index: number) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div>
                          <h4 className="font-semibold">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Skills</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {member.skills.map((skill: string, skillIndex: number) => (
                              <Badge key={skillIndex} variant="secondary" className={getSkillColor(skill)}>
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Motivation</Label>
                          <p className="text-sm text-gray-600 mt-1">
                            "Excited to contribute to this project and learn new technologies while working with a great
                            team."
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="proposal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Proposal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Project Understanding</Label>
                  <p className="text-sm text-gray-600 mt-1">{application.proposal}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Proposed Approach</Label>
                  <p className="text-sm text-gray-600 mt-1">
                    We will follow an agile development methodology with weekly sprints. Our approach includes:
                    <br />• Requirements analysis and user story mapping
                    <br />• UI/UX design and prototyping
                    <br />• Iterative development with continuous testing
                    <br />• Regular code reviews and quality assurance
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Technology Stack</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["React", "Node.js", "MongoDB", "Express", "TypeScript", "Tailwind CSS"].map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Timeline & Milestones</Label>
                  <div className="space-y-2 mt-1">
                    <div className="flex justify-between text-sm">
                      <span>Phase 1: Planning & Design</span>
                      <span>Week 1-2</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Phase 2: Core Development</span>
                      <span>Week 3-6</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Phase 3: Testing & Deployment</span>
                      <span>Week 7-8</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Skills Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium">Technical Skills Coverage</Label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">95%</div>
                        <div className="text-sm text-gray-600">Frontend</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">88%</div>
                        <div className="text-sm text-gray-600">Backend</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">75%</div>
                        <div className="text-sm text-gray-600">DevOps</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Skill Matrix</Label>
                    <div className="space-y-3 mt-2">
                      {[
                        "JavaScript/TypeScript",
                        "React/Frontend",
                        "Node.js/Backend",
                        "Database Design",
                        "UI/UX Design",
                        "Testing",
                      ].map((skill, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{skill}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={Math.random() * 40 + 60} className="w-24 h-2" />
                            <span className="text-sm font-medium">{Math.floor(Math.random() * 40 + 60)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Portfolio Links</Label>
                    <div className="space-y-2 mt-1">
                      <a href="#" className="text-sm text-blue-600 hover:underline block">
                        GitHub: github.com/codecrusaders
                      </a>
                      <a href="#" className="text-sm text-blue-600 hover:underline block">
                        Portfolio: codecrusaders.dev
                      </a>
                      <a href="#" className="text-sm text-blue-600 hover:underline block">
                        Demo Project: taskmanager-demo.netlify.app
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evaluation Rubric</CardTitle>
                <CardDescription>Rate each criterion from 1-10</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium">Technical Competency</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Slider
                      value={evaluation.technical}
                      onValueChange={(value) => setEvaluation((prev) => ({ ...prev, technical: value }))}
                      max={10}
                      min={1}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-8">{evaluation.technical[0]}/10</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Team Composition</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Slider
                      value={evaluation.teamComposition}
                      onValueChange={(value) => setEvaluation((prev) => ({ ...prev, teamComposition: value }))}
                      max={10}
                      min={1}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-8">{evaluation.teamComposition[0]}/10</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Project Understanding</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Slider
                      value={evaluation.projectUnderstanding}
                      onValueChange={(value) => setEvaluation((prev) => ({ ...prev, projectUnderstanding: value }))}
                      max={10}
                      min={1}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-8">{evaluation.projectUnderstanding[0]}/10</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Communication Skills</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Slider
                      value={evaluation.communication}
                      onValueChange={(value) => setEvaluation((prev) => ({ ...prev, communication: value }))}
                      max={10}
                      min={1}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-8">{evaluation.communication[0]}/10</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Innovation Potential</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Slider
                      value={evaluation.innovation}
                      onValueChange={(value) => setEvaluation((prev) => ({ ...prev, innovation: value }))}
                      max={10}
                      min={1}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-8">{evaluation.innovation[0]}/10</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-semibold">Overall Score</Label>
                    <div className="text-2xl font-bold text-blue-600">{overallScore}/10</div>
                  </div>
                  <Progress value={overallScore * 10} className="mt-2" />
                </div>

                <div>
                  <Label className="text-sm font-medium">Feedback & Comments</Label>
                  <Textarea
                    placeholder="Provide detailed feedback for the team..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="mt-2"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Team
            </Button>
            <Button variant="outline">Request More Info</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {application.status === "pending" && (
              <>
                <Button variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

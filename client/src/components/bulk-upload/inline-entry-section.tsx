"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Copy } from "lucide-react"
import type { BulkProjectData } from "../../app/admin-dashboard/project-buckets/bulk-create/page"

interface InlineEntrySectionProps {
  projects: BulkProjectData[]
  onProjectsUpdate: (projects: BulkProjectData[]) => void
}

const categories = [
  "web-development",
  "mobile-app-development",
  "ai-machine-learning",
  "data-science",
  "cybersecurity",
  "game-development",
  "iot-hardware",
  "blockchain",
  "devops-cloud",
  "ui-ux-design",
]

const difficulties = ["beginner", "intermediate", "advanced"]

const emptyProject: BulkProjectData = {
  title: "",
  description: "",
  category: "",
  difficulty: "beginner",
  duration: 8,
  technologies: [],
  minTeamSize: 3,
  maxTeamSize: 5,
  maxTeams: 1,
  professorEmail: "",
  department: "",
  applicationDeadline: "",
  projectStartDate: "",
  projectEndDate: "",
  budget: 0,
  prerequisites: "",
}

export function InlineEntrySection({ projects, onProjectsUpdate }: InlineEntrySectionProps) {
  const [localProjects, setLocalProjects] = useState<BulkProjectData[]>(
    projects.length > 0 ? projects : [{ ...emptyProject }],
  )

  const updateProject = (index: number, field: keyof BulkProjectData, value: any) => {
    const updated = [...localProjects]
    updated[index] = { ...updated[index], [field]: value }
    setLocalProjects(updated)
    onProjectsUpdate(updated.filter((p) => p.title.trim() !== ""))
  }

  const addProject = () => {
    setLocalProjects([...localProjects, { ...emptyProject }])
  }

  const removeProject = (index: number) => {
    const updated = localProjects.filter((_, i) => i !== index)
    setLocalProjects(updated)
    onProjectsUpdate(updated.filter((p) => p.title.trim() !== ""))
  }

  const duplicateProject = (index: number) => {
    const projectToDuplicate = { ...localProjects[index] }
    projectToDuplicate.title = `${projectToDuplicate.title} (Copy)`
    const updated = [...localProjects]
    updated.splice(index + 1, 0, projectToDuplicate)
    setLocalProjects(updated)
    onProjectsUpdate(updated.filter((p) => p.title.trim() !== ""))
  }

  const updateTechnologies = (index: number, techString: string) => {
    const technologies = techString
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
    updateProject(index, "technologies", technologies)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Inline Project Entry</h3>
          <p className="text-sm text-muted-foreground">Add projects one by one using the form below</p>
        </div>
        <Button onClick={addProject} variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {localProjects.map((project, index) => (
          <Card key={index}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Project {index + 1}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => duplicateProject(index)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  {localProjects.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeProject(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Title *</label>
                  <Input
                    placeholder="Enter project title"
                    value={project.title}
                    onChange={(e) => updateProject(index, "title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Professor Email *</label>
                  <Input
                    placeholder="professor@university.edu"
                    value={project.professorEmail}
                    onChange={(e) => updateProject(index, "professorEmail", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description *</label>
                <Textarea
                  placeholder="Describe the project objectives and scope"
                  value={project.description}
                  onChange={(e) => updateProject(index, "description", e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={project.category} onValueChange={(value) => updateProject(index, "category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty</label>
                  <Select
                    value={project.difficulty}
                    onValueChange={(value) => updateProject(index, "difficulty", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((diff) => (
                        <SelectItem key={diff} value={diff}>
                          {diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Input
                    placeholder="Computer Science"
                    value={project.department}
                    onChange={(e) => updateProject(index, "department", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Technologies</label>
                <Input
                  placeholder="React, Node.js, MongoDB (comma-separated)"
                  value={project.technologies.join(", ")}
                  onChange={(e) => updateTechnologies(index, e.target.value)}
                />
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration (weeks)</label>
                  <Input
                    type="number"
                    min={1}
                    max={20}
                    value={project.duration}
                    onChange={(e) => updateProject(index, "duration", Number.parseInt(e.target.value) || 8)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Min Team Size</label>
                  <Input
                    type="number"
                    min={2}
                    max={8}
                    value={project.minTeamSize}
                    onChange={(e) => updateProject(index, "minTeamSize", Number.parseInt(e.target.value) || 3)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Team Size</label>
                  <Input
                    type="number"
                    min={2}
                    max={8}
                    value={project.maxTeamSize}
                    onChange={(e) => updateProject(index, "maxTeamSize", Number.parseInt(e.target.value) || 5)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Teams</label>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={project.maxTeams}
                    onChange={(e) => updateProject(index, "maxTeams", Number.parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Application Deadline</label>
                  <Input
                    type="date"
                    value={project.applicationDeadline}
                    onChange={(e) => updateProject(index, "applicationDeadline", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    value={project.projectStartDate}
                    onChange={(e) => updateProject(index, "projectStartDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    type="date"
                    value={project.projectEndDate}
                    onChange={(e) => updateProject(index, "projectEndDate", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {localProjects.length < 15 && (
        <Button onClick={addProject} variant="outline" className="w-full bg-transparent">
          <Plus className="mr-2 h-4 w-4" />
          Add Another Project
        </Button>
      )}
    </div>
  )
}

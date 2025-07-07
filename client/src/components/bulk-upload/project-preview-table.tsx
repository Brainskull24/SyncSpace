"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Trash2, Save, X } from "lucide-react"
import type { BulkProjectData } from "../../app/admin-dashboard/project-buckets/bulk-create/page"

interface ProjectPreviewTableProps {
  projects: BulkProjectData[]
  onProjectsUpdate: (projects: BulkProjectData[]) => void
}

export function ProjectPreviewTable({ projects, onProjectsUpdate }: ProjectPreviewTableProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingProject, setEditingProject] = useState<BulkProjectData | null>(null)
  const [selectedProjects, setSelectedProjects] = useState<number[]>([])

  const startEditing = (index: number) => {
    setEditingIndex(index)
    setEditingProject({ ...projects[index] })
  }

  const cancelEditing = () => {
    setEditingIndex(null)
    setEditingProject(null)
  }

  const saveEditing = () => {
    if (editingIndex !== null && editingProject) {
      const updated = [...projects]
      updated[editingIndex] = editingProject
      onProjectsUpdate(updated)
      setEditingIndex(null)
      setEditingProject(null)
    }
  }

  const deleteProject = (index: number) => {
    const updated = projects.filter((_, i) => i !== index)
    onProjectsUpdate(updated)
    setSelectedProjects(selectedProjects.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i)))
  }

  const deleteSelected = () => {
    const updated = projects.filter((_, index) => !selectedProjects.includes(index))
    onProjectsUpdate(updated)
    setSelectedProjects([])
  }

  const toggleProjectSelection = (index: number) => {
    setSelectedProjects((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const toggleAllSelection = () => {
    setSelectedProjects(selectedProjects.length === projects.length ? [] : projects.map((_, i) => i))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No projects to preview. Add some projects using the methods above.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {selectedProjects.length > 0 && (
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">{selectedProjects.length} projects selected</span>
          <Button variant="destructive" size="sm" onClick={deleteSelected}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected
          </Button>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto max-h-[500px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedProjects.length === projects.length}
                    onCheckedChange={toggleAllSelection}
                  />
                </TableHead>
                <TableHead className="min-w-[200px]">Project Title</TableHead>
                <TableHead className="min-w-[150px]">Professor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Teams</TableHead>
                <TableHead>Technologies</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProjects.includes(index)}
                      onCheckedChange={() => toggleProjectSelection(index)}
                    />
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <Input
                        value={editingProject?.title || ""}
                        onChange={(e) =>
                          setEditingProject((prev) => (prev ? { ...prev, title: e.target.value } : null))
                        }
                        className="min-w-[180px]"
                      />
                    ) : (
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <Input
                        value={editingProject?.supervisorEmail || ""}
                        onChange={(e) =>
                          setEditingProject((prev) => (prev ? { ...prev, professorEmail: e.target.value } : null))
                        }
                        className="min-w-[140px]"
                      />
                    ) : (
                      <div>
                        <p className="text-sm">{project.supervisorEmail}</p>
                        <p className="text-xs text-muted-foreground">{project.department}</p>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <Select
                        value={editingProject?.category || ""}
                        onValueChange={(value) =>
                          setEditingProject((prev) => (prev ? { ...prev, category: value } : null))
                        }
                      >
                        <SelectTrigger className="min-w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web-development">Web Development</SelectItem>
                          <SelectItem value="mobile-app-development">Mobile Development</SelectItem>
                          <SelectItem value="ai-machine-learning">AI/ML</SelectItem>
                          <SelectItem value="data-science">Data Science</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        {project.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <Select
                        value={editingProject?.difficulty || ""}
                        onValueChange={(value) =>
                          setEditingProject((prev) => (prev ? { ...prev, difficulty: value } : null))
                        }
                      >
                        <SelectTrigger className="min-w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge className={getDifficultyColor(project.difficulty)}>
                        {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <Input
                        type="number"
                        min={1}
                        max={10}
                        value={editingProject?.maxTeams || 1}
                        onChange={(e) =>
                          setEditingProject((prev) =>
                            prev ? { ...prev, maxTeams: Number.parseInt(e.target.value) || 1 } : null,
                          )
                        }
                        className="w-16"
                      />
                    ) : (
                      <Badge variant="secondary">{project.maxTeams}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={saveEditing} className="h-8 w-8">
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={cancelEditing} className="h-8 w-8">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => startEditing(index)} className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteProject(index)} className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

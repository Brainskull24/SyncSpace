"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface TechnicalRequirementsSectionProps {
  formData: any
  updateFormData: (field: string, value: any) => void
}

const technologyOptions = [
  { label: "React", value: "react", category: "Frontend" },
  { label: "Vue.js", value: "vue", category: "Frontend" },
  { label: "Angular", value: "angular", category: "Frontend" },
  { label: "HTML/CSS", value: "html-css", category: "Frontend" },
  { label: "JavaScript", value: "javascript", category: "Frontend" },
  { label: "TypeScript", value: "typescript", category: "Frontend" },
  { label: "Node.js", value: "nodejs", category: "Backend" },
  { label: "Python", value: "python", category: "Backend" },
  { label: "Java", value: "java", category: "Backend" },
  { label: "PHP", value: "php", category: "Backend" },
  { label: "C#", value: "csharp", category: "Backend" },
  { label: "MongoDB", value: "mongodb", category: "Database" },
  { label: "MySQL", value: "mysql", category: "Database" },
  { label: "PostgreSQL", value: "postgresql", category: "Database" },
  { label: "Redis", value: "redis", category: "Database" },
  { label: "Docker", value: "docker", category: "DevOps" },
  { label: "AWS", value: "aws", category: "Cloud" },
  { label: "Azure", value: "azure", category: "Cloud" },
  { label: "Git", value: "git", category: "Tools" },
  { label: "GraphQL", value: "graphql", category: "API" },
  { label: "REST API", value: "rest-api", category: "API" },
]

export function TechnicalRequirementsSection({ formData, updateFormData }: TechnicalRequirementsSectionProps) {
  const [customTech, setCustomTech] = useState("")

  const addCustomTechnology = () => {
    if (customTech && customTech.trim()) {
      updateFormData("technologies", [...formData.technologies, customTech.trim()])
      setCustomTech("")
    }
  }

  const removeTechnology = (techToRemove: string) => {
    updateFormData(
      "technologies",
      formData.technologies.filter((tech: string) => tech !== techToRemove),
    )
  }

  const toggleTechnology = (tech: string) => {
    if (formData.technologies.includes(tech)) {
      updateFormData(
        "technologies",
        formData.technologies.filter((t: string) => t !== tech),
      )
    } else {
      updateFormData("technologies", [...formData.technologies, tech])
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Specifications</CardTitle>
        <CardDescription>Define the technical requirements and constraints for the project</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Required Technologies *</Label>
          <p className="text-sm text-muted-foreground">Select the main technologies students will work with</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto border rounded-md p-4">
            {technologyOptions.map((tech) => (
              <div key={tech.value} className="flex items-center space-x-2">
                <Checkbox
                  id={tech.value}
                  checked={formData.technologies.includes(tech.value)}
                  onCheckedChange={() => toggleTechnology(tech.value)}
                />
                <label
                  htmlFor={tech.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {tech.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {formData.technologies.length > 0 && (
          <div>
            <Label>Selected Technologies</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.technologies.map((tech: string) => (
                <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                  {tech}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeTechnology(tech)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <div className="flex-1">
            <Label>Add Custom Technology</Label>
            <Input
              placeholder="Enter technology name..."
              value={customTech}
              className="mt-2"
              onChange={(e) => setCustomTech(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addCustomTechnology()
                }
              }}
            />
          </div>
          <div className="flex items-end">
            <Button type="button" onClick={addCustomTechnology} variant="outline">
              Add
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="minTeamSize">Minimum Team Size</Label>
            <Input
              id="minTeamSize"
              type="number"
              min={2}
              max={8}
              value={formData.minTeamSize}
              onChange={(e) => updateFormData("minTeamSize", Number.parseInt(e.target.value))}
            />
            <p className="text-sm text-muted-foreground">Minimum number of team members required</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxTeamSize">Maximum Team Size</Label>
            <Input
              id="maxTeamSize"
              type="number"
              min={2}
              max={8}
              value={formData.maxTeamSize}
              onChange={(e) => updateFormData("maxTeamSize", Number.parseInt(e.target.value))}
            />
            <p className="text-sm text-muted-foreground">Maximum number of team members allowed</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="prerequisites">Prerequisites</Label>
          <Textarea
            id="prerequisites"
            placeholder="List any required skills, courses, or experience..."
            className="min-h-[100px]"
            value={formData.prerequisites}
            onChange={(e) => updateFormData("prerequisites", e.target.value)}
          />
          <p className="text-sm text-muted-foreground">What should students know before starting this project?</p>
        </div>
      </CardContent>
    </Card>
  )
}

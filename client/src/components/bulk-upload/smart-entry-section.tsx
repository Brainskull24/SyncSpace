"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Zap, Sparkles, AlertCircle } from "lucide-react"
import type { BulkProjectData } from "../../app/admin-dashboard/project-buckets/bulk-create/page"

interface SmartEntrySectionProps {
  onProjectsUpdate: (projects: BulkProjectData[]) => void
}

const exampleText = `Smart Parking System - IoT based parking system using sensors and mobile app - Prof. Sharma - 4 teams - Intermediate
Online Lab Management - Java + MongoDB web application for lab booking - Prof. Verma - 3 teams - Beginner  
AI Chatbot Platform - Python, TensorFlow, Flask chatbot with NLP - Dr. Johnson - 2 teams - Advanced
E-commerce Mobile App - React Native shopping app with payment integration - Prof. Lee - 5 teams - Intermediate`

export function SmartEntrySection({ onProjectsUpdate }: SmartEntrySectionProps) {
  const [inputText, setInputText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [parsedProjects, setParsedProjects] = useState<BulkProjectData[]>([])
  const [error, setError] = useState("")

  const parseSmartText = async () => {
    if (!inputText.trim()) return

    setIsProcessing(true)
    setError("")

    try {
      // Simulate AI processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const lines = inputText.split("\n").filter((line) => line.trim())
      const projects: BulkProjectData[] = []

      for (const line of lines) {
        // Simple regex parsing (in real implementation, this would be more sophisticated AI/NLP)
        const patterns = {
          title: /^([^-]+?)(?:\s*-)/,
          description: /-\s*([^-]+?)(?:\s*-)/,
          professor: /-\s*(?:Prof\.|Dr\.|Professor)\s*([^-]+?)(?:\s*-)/i,
          teams: /-\s*(\d+)\s*teams?/i,
          difficulty: /-\s*(beginner|intermediate|advanced)/i,
          technologies: /(?:using|with|tech:|technologies:)\s*([^-]+?)(?:\s*-|$)/i,
        }

        const title = patterns.title.exec(line)?.[1]?.trim()
        const description = patterns.description.exec(line)?.[1]?.trim()
        const professor = patterns.professor.exec(line)?.[1]?.trim()
        const teams = patterns.teams.exec(line)?.[1]
        const difficulty = patterns.difficulty.exec(line)?.[1]?.toLowerCase()
        const techMatch = patterns.technologies.exec(line)?.[1]?.trim()

        if (title && description) {
          const technologies = techMatch
            ? techMatch
                .split(/[,+&]/)
                .map((t) => t.trim())
                .filter(Boolean)
            : []

          const project: BulkProjectData = {
            title,
            description,
            category: inferCategory(title, description, technologies),
            difficulty: (difficulty as "beginner" | "intermediate" | "advanced") || "beginner",
            duration: 8,
            technologies,
            minTeamSize: 3,
            maxTeamSize: 5,
            maxTeams: teams ? Number.parseInt(teams) : 1,
            professorEmail: professor ? `${professor.toLowerCase().replace(/\s+/g, ".")}@university.edu` : "",
            department: inferDepartment(technologies),
            applicationDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            projectStartDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            projectEndDate: new Date(Date.now() + 77 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            budget: 0,
            prerequisites: "",
          }

          projects.push(project)
        }
      }

      if (projects.length === 0) {
        throw new Error("No valid projects could be parsed from the input text")
      }

      setParsedProjects(projects)
      onProjectsUpdate(projects)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse text")
    } finally {
      setIsProcessing(false)
    }
  }

  const inferCategory = (title: string, description: string, technologies: string[]): string => {
    const text = `${title} ${description} ${technologies.join(" ")}`.toLowerCase()

    if (text.includes("mobile") || text.includes("app") || text.includes("android") || text.includes("ios")) {
      return "mobile-app-development"
    }
    if (
      text.includes("ai") ||
      text.includes("ml") ||
      text.includes("machine learning") ||
      text.includes("tensorflow")
    ) {
      return "ai-machine-learning"
    }
    if (text.includes("web") || text.includes("website") || text.includes("react") || text.includes("html")) {
      return "web-development"
    }
    if (text.includes("data") || text.includes("analytics") || text.includes("database")) {
      return "data-science"
    }
    if (text.includes("iot") || text.includes("sensor") || text.includes("hardware")) {
      return "iot-hardware"
    }
    if (text.includes("game") || text.includes("unity") || text.includes("gaming")) {
      return "game-development"
    }
    if (text.includes("security") || text.includes("cyber") || text.includes("encryption")) {
      return "cybersecurity"
    }
    if (text.includes("blockchain") || text.includes("crypto") || text.includes("bitcoin")) {
      return "blockchain"
    }

    return "web-development" // default
  }

  const inferDepartment = (technologies: string[]): string => {
    const techString = technologies.join(" ").toLowerCase()

    if (techString.includes("java") || techString.includes("python") || techString.includes("javascript")) {
      return "Computer Science"
    }
    if (techString.includes("react") || techString.includes("angular") || techString.includes("vue")) {
      return "Software Engineering"
    }
    if (techString.includes("tensorflow") || techString.includes("pytorch") || techString.includes("ml")) {
      return "Data Science"
    }
    if (techString.includes("arduino") || techString.includes("raspberry") || techString.includes("sensor")) {
      return "Electrical Engineering"
    }

    return "Computer Science" // default
  }

  const clearAll = () => {
    setInputText("")
    setParsedProjects([])
    setError("")
    onProjectsUpdate([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI-Powered Smart Entry
          </CardTitle>
          <CardDescription>
            Paste plain text descriptions and let AI automatically parse project details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Descriptions</label>
            <Textarea
              placeholder={`Paste your project descriptions here. For example:\n\n${exampleText}`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Each line should contain: Project Title - Description - Professor - Teams - Difficulty
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={parseSmartText} disabled={!inputText.trim() || isProcessing}>
              {isProcessing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Parse Projects
                </>
              )}
            </Button>
            {(parsedProjects.length > 0 || error) && (
              <Button variant="outline" onClick={clearAll}>
                Clear All
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {parsedProjects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Parsed Projects ({parsedProjects.length})</CardTitle>
            <CardDescription>Review the automatically extracted project information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {parsedProjects.map((project, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium">{project.title}</h4>
                    <div className="flex gap-1">
                      <Badge variant="outline">{project.difficulty}</Badge>
                      <Badge variant="secondary">{project.maxTeams} teams</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Professor: {project.professorEmail}</span>
                    <span>Department: {project.department}</span>
                    <span>Category: {project.category.replace("-", " ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-3">Smart Entry Tips</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Each line should describe one project</p>
            <p>• Include project title, description, professor name, and team count</p>
            <p>• Mention technologies and difficulty level for better parsing</p>
            <p>• Use common separators like dashes (-) or commas</p>
            <p>• AI will automatically infer categories and generate email addresses</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Users, Zap, Eye } from "lucide-react"

interface ProjectPreviewProps {
  data: any
}

export function ProjectPreview({ data }: ProjectPreviewProps) {
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

  const formattedDescription = data.description ? data.description.replace(/<[^>]*>/g, "") : ""

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Student Preview
        </CardTitle>
        <CardDescription>How this project will appear to students</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.title && (
          <div>
            <h3 className="text-lg font-semibold">{data.title}</h3>
            {data.category && (
              <Badge variant="outline" className="mt-1">
                {data.category.replace("-", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </Badge>
            )}
          </div>
        )}

        {data.description && (
          <div>
            <p className="text-sm text-muted-foreground line-clamp-3">{formattedDescription}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {data.difficulty && (
            <Badge className={getDifficultyColor(data.difficulty)}>
              <Zap className="mr-1 h-3 w-3" />
              {data.difficulty.charAt(0).toUpperCase() + data.difficulty.slice(1)}
            </Badge>
          )}

          {data.duration && (
            <Badge variant="outline">
              <Clock className="mr-1 h-3 w-3" />
              {data.duration} weeks
            </Badge>
          )}

          {data.minTeamSize && data.maxTeamSize && (
            <Badge variant="outline">
              <Users className="mr-1 h-3 w-3" />
              {data.minTeamSize}-{data.maxTeamSize} members
            </Badge>
          )}
        </div>

        {data.technologies && data.technologies.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-1">
              {data.technologies.slice(0, 6).map((tech: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {data.technologies.length > 6 && (
                <Badge variant="secondary" className="text-xs">
                  +{data.technologies.length - 6} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <Separator />

        <div className="space-y-2 text-xs text-muted-foreground">
          {data.applicationDeadline && (
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              <span>Apply by: {new Date(data.applicationDeadline).toLocaleDateString()}</span>
            </div>
          )}

          {data.maxTeams && (
            <div className="flex items-center gap-2">
              <Users className="h-3 w-3" />
              <span>Max {data.maxTeams} teams</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

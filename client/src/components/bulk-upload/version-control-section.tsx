"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X, Plus, Tag } from "lucide-react"
import type { VersionInfo } from "../../app/admin-dashboard/project-buckets/bulk-create/page"

interface VersionControlSectionProps {
  versionInfo: VersionInfo
  onVersionInfoUpdate: (versionInfo: VersionInfo) => void
}

const semesters = ["Spring 2024", "Summer 2024", "Fall 2024", "Winter 2024", "Spring 2025", "Summer 2025", "Fall 2025"]

const departments = [
  "Computer Science",
  "Software Engineering",
  "Data Science",
  "Electrical Engineering",
  "Information Systems",
  "Mathematics",
  "Business Administration",
]

const commonTags = [
  "Industry Partnership",
  "Research Project",
  "Capstone",
  "Internship",
  "Competition",
  "Open Source",
  "Startup",
  "AI/ML Focus",
  "Web Development",
  "Mobile Development",
]

export function VersionControlSection({ versionInfo, onVersionInfoUpdate }: VersionControlSectionProps) {
  const [newTag, setNewTag] = useState("")

  const updateField = (field: keyof VersionInfo, value: any) => {
    onVersionInfoUpdate({ ...versionInfo, [field]: value })
  }

  const addTag = (tag: string) => {
    if (tag && !versionInfo.tags.includes(tag)) {
      updateField("tags", [...versionInfo.tags, tag])
    }
    setNewTag("")
  }

  const removeTag = (tagToRemove: string) => {
    updateField(
      "tags",
      versionInfo.tags.filter((tag) => tag !== tagToRemove),
    )
  }

  const addCommonTag = (tag: string) => {
    addTag(tag)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Version Control & Organization
        </CardTitle>
        <CardDescription>Organize your projects with version information and tags</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="version-name">Version Name *</Label>
            <Input
              id="version-name"
              placeholder="e.g., Spring 2024 CS Projects"
              value={versionInfo.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">A descriptive name for this batch of projects</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester">Semester *</Label>
            <Select value={versionInfo.semester} onValueChange={(value) => updateField("semester", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((semester) => (
                  <SelectItem key={semester} value={semester}>
                    {semester}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="version-description">Description</Label>
          <Textarea
            id="version-description"
            placeholder="Describe this batch of projects, any special requirements, or notes..."
            value={versionInfo.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="primary-department">Primary Department</Label>
          <Select value={versionInfo.department} onValueChange={(value) => updateField("department", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select primary department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">Main department responsible for these projects</p>
        </div>

        <div className="space-y-4">
          <Label>Tags</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add custom tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTag(newTag)
                }
              }}
            />
            <Button type="button" onClick={() => addTag(newTag)} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {versionInfo.tags.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Selected Tags:</p>
              <div className="flex flex-wrap gap-2">
                {versionInfo.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium">Quick Tags:</p>
            <div className="flex flex-wrap gap-2">
              {commonTags
                .filter((tag) => !versionInfo.tags.includes(tag))
                .map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addCommonTag(tag)}
                    className="h-7 text-xs"
                  >
                    + {tag}
                  </Button>
                ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        {(versionInfo.name || versionInfo.semester || versionInfo.tags.length > 0) && (
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Version Preview</h4>
            <div className="space-y-1 text-sm">
              {versionInfo.name && (
                <p>
                  <strong>Name:</strong> {versionInfo.name}
                </p>
              )}
              {versionInfo.semester && (
                <p>
                  <strong>Semester:</strong> {versionInfo.semester}
                </p>
              )}
              {versionInfo.department && (
                <p>
                  <strong>Department:</strong> {versionInfo.department}
                </p>
              )}
              {versionInfo.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <strong>Tags:</strong>
                  <div className="flex flex-wrap gap-1">
                    {versionInfo.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

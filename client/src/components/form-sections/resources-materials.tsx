"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { X, Plus, Upload } from "lucide-react"

interface ResourcesMaterialsSectionProps {
  formData: any
  updateFormData: (field: string, value: any) => void
}

export function ResourcesMaterialsSection({ formData, updateFormData }: ResourcesMaterialsSectionProps) {
  const addExternalLink = () => {
    updateFormData("externalLinks", [...formData.externalLinks, ""])
  }

  const updateExternalLink = (index: number, value: string) => {
    const updatedLinks = [...formData.externalLinks]
    updatedLinks[index] = value
    updateFormData("externalLinks", updatedLinks)
  }

  const removeExternalLink = (index: number) => {
    updateFormData(
      "externalLinks",
      formData.externalLinks.filter((_: any, i: number) => i !== index),
    )
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    updateFormData("projectFiles", [...formData.projectFiles, ...files])
  }

  const removeFile = (index: number) => {
    updateFormData(
      "projectFiles",
      formData.projectFiles.filter((_: any, i: number) => i !== index),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Resources</CardTitle>
        <CardDescription>Upload files and provide additional resources for students</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Project Files & Documents</Label>
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-primary hover:text-primary/80">Click to upload files</span>
                  <span className="text-muted-foreground"> or drag and drop</span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.md"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">PDF, DOC, DOCX, TXT, MD files up to 10MB each</p>
            </div>

            {formData.projectFiles.length > 0 && (
              <div className="space-y-2">
                {formData.projectFiles.map((file: File, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Upload project briefs, requirements documents, or reference materials
          </p>
        </div>

        <div>
          <Label>External Links</Label>
          <p className="text-sm text-muted-foreground mb-4">
            Add links to GitHub repositories, documentation, or other resources
          </p>
          <div className="space-y-3">
            {formData.externalLinks.map((link: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="https://github.com/example/repo"
                  value={link}
                  onChange={(e) => updateExternalLink(index, e.target.value)}
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="icon" onClick={() => removeExternalLink(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addExternalLink} className="w-full bg-transparent">
              <Plus className="mr-2 h-4 w-4" />
              Add External Link
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="budget">Budget Allocation (Optional)</Label>
            <Input
              id="budget"
              type="number"
              min={0}
              placeholder="0"
              value={formData.budget}
              onChange={(e) => updateFormData("budget", Number.parseFloat(e.target.value) || 0)}
            />
            <p className="text-sm text-muted-foreground">Budget available for this project (in USD)</p>
          </div>

          <div className="flex items-end">
            <div className="text-sm text-muted-foreground">
              {formData.budget > 0 && (
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Budget: ${formData.budget}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="equipmentRequirements">Equipment & Software Requirements</Label>
          <Textarea
            id="equipmentRequirements"
            placeholder="List any special equipment, software licenses, or hardware requirements..."
            className="min-h-[100px]"
            value={formData.equipmentRequirements}
            onChange={(e) => updateFormData("equipmentRequirements", e.target.value)}
          />
          <p className="text-sm text-muted-foreground">What equipment or software will students need access to?</p>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface TeamApplicationSectionProps {
  formData: any
  updateFormData: (field: string, value: any) => void
}

export function TeamApplicationSection({ formData, updateFormData }: TeamApplicationSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Configuration</CardTitle>
        <CardDescription>Set up team limits and application requirements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="maxTeams">Maximum Number of Teams</Label>
          <Input
            id="maxTeams"
            type="number"
            min={1}
            max={10}
            value={formData.maxTeams}
            onChange={(e) => updateFormData("maxTeams", Number.parseInt(e.target.value))}
          />
          <p className="text-sm text-muted-foreground">How many teams can work on this project simultaneously?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="applicationDeadline">Application Deadline</Label>
            <Input
              id="applicationDeadline"
              type="date"
              value={formData.applicationDeadline}
              onChange={(e) => updateFormData("applicationDeadline", e.target.value)}
            />
            <p className="text-sm text-muted-foreground">When do applications close?</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectStartDate">Project Start Date</Label>
            <Input
              id="projectStartDate"
              type="date"
              value={formData.projectStartDate}
              onChange={(e) => updateFormData("projectStartDate", e.target.value)}
            />
            <p className="text-sm text-muted-foreground">When does the project begin?</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectEndDate">Project End Date</Label>
            <Input
              id="projectEndDate"
              type="date"
              value={formData.projectEndDate}
              onChange={(e) => updateFormData("projectEndDate", e.target.value)}
            />
            <p className="text-sm text-muted-foreground">When is the project due?</p>
          </div>
        </div>

        <div>
          <Label className="text-base">Application Requirements</Label>
          <p className="text-sm text-muted-foreground mb-4">Select what students must submit when applying</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="requireTeamIntro"
                checked={formData.requireTeamIntro}
                onCheckedChange={(checked) => updateFormData("requireTeamIntro", checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="requireTeamIntro">Team Introduction Required</Label>
                <p className="text-sm text-muted-foreground">Teams must provide an introduction about their members</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="requireSkillAssessment"
                checked={formData.requireSkillAssessment}
                onCheckedChange={(checked) => updateFormData("requireSkillAssessment", checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="requireSkillAssessment">Individual Skill Assessment</Label>
                <p className="text-sm text-muted-foreground">Each team member must complete a skill assessment</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="requireProposal"
                checked={formData.requireProposal}
                onCheckedChange={(checked) => updateFormData("requireProposal", checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="requireProposal">Project Proposal Submission</Label>
                <p className="text-sm text-muted-foreground">Teams must submit a detailed project proposal</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="requireVideoPitch"
                checked={formData.requireVideoPitch}
                onCheckedChange={(checked) => updateFormData("requireVideoPitch", checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="requireVideoPitch">Video Pitch Requirement</Label>
                <p className="text-sm text-muted-foreground">Teams must submit a video pitch presentation</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

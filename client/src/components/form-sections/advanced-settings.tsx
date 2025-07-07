"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface AdvancedSettingsSectionProps {
  formData: any
  updateFormData: (field: string, value: any) => void
}

export function AdvancedSettingsSection({ formData, updateFormData }: AdvancedSettingsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Configuration</CardTitle>
        <CardDescription>Advanced settings for project visibility and partnerships</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="text-base">Public Visibility</Label>
            <p className="text-sm text-muted-foreground">
              Make this project visible to all students, or require application approval
            </p>
          </div>
          <Switch checked={formData.isPublic} onCheckedChange={(checked) => updateFormData("isPublic", checked)} />
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="text-base">Industry Partner Involvement</Label>
            <p className="text-sm text-muted-foreground">
              This project involves collaboration with an industry partner
            </p>
          </div>
          <Switch
            checked={formData.hasIndustryPartner}
            onCheckedChange={(checked) => updateFormData("hasIndustryPartner", checked)}
          />
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="text-base">Real Client Project</Label>
            <p className="text-sm text-muted-foreground">Students will work on a real project for an external client</p>
          </div>
          <Switch
            checked={formData.isRealClient}
            onCheckedChange={(checked) => updateFormData("isRealClient", checked)}
          />
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="text-base">NDA Requirements</Label>
            <p className="text-sm text-muted-foreground">
              Students must sign a non-disclosure agreement before participating
            </p>
          </div>
          <Switch
            checked={formData.requiresNDA}
            onCheckedChange={(checked) => updateFormData("requiresNDA", checked)}
          />
        </div>
      </CardContent>
    </Card>
  )
}

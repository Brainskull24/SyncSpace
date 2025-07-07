"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "lucide-react"
import { CommonBucketData } from "../../app/admin-dashboard/project-buckets/bulk-create/page"

interface CommonBucketDataProps {
  commonBucketData: CommonBucketData
  onCommonBucketDataUpdate: (data: CommonBucketData) => void
}

export default function CommonBucketForm({ commonBucketData, onCommonBucketDataUpdate }: CommonBucketDataProps) {
  const updateField = (field: keyof CommonBucketData, value: any) => {
    onCommonBucketDataUpdate({ ...commonBucketData, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Common Project Settings
        </CardTitle>
        <CardDescription>
          Define default project values like team size and important dates. These will be applied to all bulk projects.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="minTeamSize">Minimum Team Size</Label>
            <Input
              id="minTeamSize"
              type="number"
              min={1}
              value={commonBucketData.minTeamSize ?? ""}
              onChange={(e) => updateField("minTeamSize", Number(e.target.value))}
              placeholder="e.g., 2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxTeamSize">Maximum Team Size</Label>
            <Input
              id="maxTeamSize"
              type="number"
              min={1}
              value={commonBucketData.maxTeamSize ?? ""}
              onChange={(e) => updateField("maxTeamSize", Number(e.target.value))}
              placeholder="e.g., 5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="applicationDeadline">Application Deadline</Label>
            <Input
              id="applicationDeadline"
              type="date"
              value={commonBucketData.applicationDeadline ?? ""}
              onChange={(e) => updateField("applicationDeadline", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectStartDate">Project Start Date</Label>
            <Input
              id="projectStartDate"
              type="date"
              value={commonBucketData.projectStartDate ?? ""}
              onChange={(e) => updateField("projectStartDate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectEndDate">Project End Date</Label>
            <Input
              id="projectEndDate"
              type="date"
              value={commonBucketData.projectEndDate ?? ""}
              onChange={(e) => updateField("projectEndDate", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

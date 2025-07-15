"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { gradingRubrics } from "@/types/projectFormData";

interface ProfessorAssignmentSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export function ProfessorAssignmentSection({
  formData,
  updateFormData,
}: ProfessorAssignmentSectionProps) {
  const [professors, setProfessors] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllProfessors();
    const intervalId = setInterval(getAllProfessors, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const getAllProfessors = async () => {
    try {
      const { data } = await api.get("/auth/professors");
      setProfessors(data.professors || []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch professors:", err);
      setError("Failed to load professor data.");
    }
  };

  const selectedSupervisor = professors.find(
    (p) => p._id === formData.supervisorId
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supervision</CardTitle>
        <CardDescription>
          Assign professors and set up evaluation criteria
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Supervisor Selection */}
        <div className="space-y-2">
          <Label>Primary Supervisor *</Label>
          <Select
            value={formData.supervisorId}
            onValueChange={(value) => updateFormData("supervisorId", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a professor" />
            </SelectTrigger>
            <SelectContent>
              {professors.map((professor) => (
                <SelectItem key={professor._id} value={professor._id}>
                  <div className="flex items-center justify-between w-full gap-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {professor.firstName[0]}
                          {professor.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {professor.firstName} {professor.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {professor.department}
                        </p>
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedSupervisor && (
            <div className="mt-2 p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {selectedSupervisor.firstName} {selectedSupervisor.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedSupervisor.department}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Co-Supervisor (Optional)</Label>
          <Select
            value={formData.coSupervisorId || "none"}
            onValueChange={(value) =>
              updateFormData("coSupervisorId", value === "none" ? "" : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a co-supervisor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {professors
                .filter((p) => p._id !== formData.supervisorId)
                .map((professor) => (
                  <SelectItem key={professor._id} value={professor._id}>
                    <div className="flex items-center justify-between w-full gap-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {professor.firstName[0]}
                            {professor.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {professor.firstName} {professor.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {professor.department}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Optional second supervisor for additional support
          </p>
        </div>

        {/* Grading Rubric */}
        <div className="space-y-2">
          <Label>Grading Rubric Template</Label>
          <Select
            value={formData.gradingRubric}
            onValueChange={(value) => updateFormData("gradingRubric", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select grading rubric" />
            </SelectTrigger>
            <SelectContent>
              {gradingRubrics.map((rubric) => (
                <SelectItem key={rubric.value} value={rubric.value}>
                  {rubric.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Choose a grading rubric template for evaluation
          </p>
        </div>

        {/* Evaluation Criteria */}
        <div className="space-y-2">
          <Label htmlFor="evaluationCriteria">Custom Evaluation Criteria</Label>
          <Textarea
            id="evaluationCriteria"
            placeholder="Define specific evaluation criteria for this project..."
            className="min-h-[100px]"
            value={formData.evaluationCriteria}
            onChange={(e) =>
              updateFormData("evaluationCriteria", e.target.value)
            }
          />
          <p className="text-sm text-muted-foreground">
            Additional criteria specific to this project (optional)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

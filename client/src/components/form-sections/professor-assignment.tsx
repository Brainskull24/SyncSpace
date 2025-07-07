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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

interface ProfessorAssignmentSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const professors = [
  {
    id: "prof-1",
    name: "Dr. Sarah Johnson",
    department: "Computer Science",
    workload: "optimal",
    email: "prof.johnson@university.edu",
  },
  {
    id: "prof-2",
    name: "Dr. Michael Chen",
    department: "Data Science",
    workload: "underloaded",
    email: "prof.chen@university.edu",
  },
  {
    id: "prof-3",
    name: "Dr. Emily Rodriguez",
    department: "Engineering",
    workload: "optimal",
    email: "prof.rodriguez@university.edu",
  },
  {
    id: "prof-4",
    name: "Dr. James Wilson",
    department: "Mathematics",
    workload: "overloaded",
    email: "prof.wilson@university.edu",
  },
  {
    id: "prof-5",
    name: "Dr. Lisa Patel",
    department: "Computer Science",
    workload: "optimal",
    email: "prof.patel@university.edu",
  },
];

const gradingRubrics = [
  { value: "standard", label: "Standard Project Rubric" },
  { value: "research", label: "Research Project Rubric" },
  { value: "industry", label: "Industry Partnership Rubric" },
  { value: "custom", label: "Custom Rubric" },
];

const getWorkloadBadge = (workload: string) => {
  switch (workload) {
    case "underloaded":
      return <Badge className="bg-blue-100 text-blue-800">Available</Badge>;
    case "optimal":
      return <Badge className="bg-green-100 text-green-800">Optimal</Badge>;
    case "overloaded":
      return <Badge className="bg-red-100 text-red-800">Busy</Badge>;
    default:
      return <Badge variant="outline">{workload}</Badge>;
  }
};

export function ProfessorAssignmentSection({
  formData,
  updateFormData,
}: ProfessorAssignmentSectionProps) {
  const selectedProfessor = professors.find(
    (p) => p.email === formData.supervisorEmail
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
        <div className="space-y-2">
          <Label>Primary Supervisor *</Label>
          <Select
            value={formData.supervisorEmail}
            onValueChange={(value) => updateFormData("supervisorEmail", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a professor" />
            </SelectTrigger>
            <SelectContent>
              {professors.map((professor) => (
                <SelectItem key={professor.email} value={professor.email}>
                  <div className="flex items-center justify-between w-full gap-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {professor.name.split(" ")[1][0]}
                          {professor.name.split(" ")[0][0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{professor.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {professor.department}
                        </p>
                      </div>
                    </div>
                    {getWorkloadBadge(professor.workload)}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedProfessor && (
            <div className="mt-2 p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{selectedProfessor.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedProfessor.department}
                  </p>
                </div>
                {getWorkloadBadge(selectedProfessor.workload)}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Co-Supervisor (Optional)</Label>
          <Select
            value={formData.coSupervisorEmail || "none"}
            onValueChange={(value) =>
              updateFormData("coSupervisorEmail", value === "none" ? "" : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a co-supervisor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {professors
                .filter((p) => p.email !== formData.supervisorEmail)
                .map((professor) => (
                  <SelectItem key={professor.email} value={professor.email}>
                    <div className="flex items-center justify-between w-full gap-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {professor.name.split(" ")[1][0]}
                            {professor.name.split(" ")[0][0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{professor.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {professor.department}
                          </p>
                        </div>
                      </div>
                      {getWorkloadBadge(professor.workload)}
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Optional second supervisor for additional support
          </p>
        </div>

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

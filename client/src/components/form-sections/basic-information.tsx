"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { projectFormData } from "@/app/admin-dashboard/project-buckets/create/page";

interface BasicInformationSectionProps {
  formData: projectFormData;
  updateFormData: (field: string, value: any) => void;
}

const categories = [
  "Web Development",
  "Mobile App Development",
  "AI/Machine Learning",
  "Data Science",
  "Cybersecurity",
  "Game Development",
  "IoT/Hardware",
  "Blockchain",
  "DevOps/Cloud",
  "UI/UX Design",
];

const difficulties = [
  {
    value: "beginner",
    label: "Beginner",
    color: "bg-green-100 text-green-800",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    color: "bg-yellow-100 text-yellow-800",
  },
  { value: "advanced", label: "Advanced", color: "bg-red-100 text-red-800" },
];

export function BasicInformationSection({
  formData,
  updateFormData,
}: BasicInformationSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
        <CardDescription>
          Basic information about the project that students will see
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title *</Label>
          <Input
            id="title"
            placeholder="Enter project title..."
            value={formData.title}
            onChange={(e) => updateFormData("title", e.target.value)}
            maxLength={100}
          />
          <p className="text-sm text-muted-foreground">
            {formData.title.length}/100 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Project Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe the project objectives, scope, and expected outcomes..."
            className="min-h-[120px]"
            value={formData.description}
            onChange={(e) => updateFormData("description", e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Provide a detailed description of the project
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="objectives">Project Objectives *</Label>
          <Textarea
            id="objectives"
            placeholder="List the specific objectives or goals of this project..."
            className="min-h-[100px]"
            value={formData.objectives}
            onChange={(e) => updateFormData("objectives", e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Clearly mention the expected goals and learning outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="category">Project Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => updateFormData("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category.toLowerCase().replace(/\s+/g, "-")}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select
              value={formData.difficulty}
              onValueChange={(value) => updateFormData("difficulty", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty.value} value={difficulty.value}>
                    <div className="flex items-center space-x-2">
                      <Badge className={difficulty.color}>
                        {difficulty.label}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Estimated Duration: {formData.duration} weeks</Label>
          <Slider
            min={4}
            max={16}
            step={1}
            value={[formData.duration]}
            onValueChange={(value) => updateFormData("duration", value[0])}
            className="w-full"
          />
          <p className="text-sm text-muted-foreground">
            How long do you expect this project to take?
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

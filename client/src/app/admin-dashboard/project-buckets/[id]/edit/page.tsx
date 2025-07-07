"use client";
import { useState, useEffect } from "react";
import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function ProjectEditForm() {
  const [project, setProject] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  const router = useRouter();
  const projectId = params.id;

  useEffect(() => {
    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/projects/${projectId}`);
      const projectData = data.project || data;

      // Format dates for input fields
      if (projectData.applicationDeadline) {
        projectData.applicationDeadline = new Date(
          projectData.applicationDeadline
        )
          .toISOString()
          .split("T")[0];
      }
      if (projectData.projectDeadline) {
        projectData.projectDeadline = new Date(projectData.projectDeadline)
          .toISOString()
          .split("T")[0];
      }

      setProject(projectData);
    } catch (err) {
      console.error("Failed to fetch project details:", err);
      setError("Failed to load project details.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProject((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put(`/projects/${projectId}`, project);

      toast("Success", {
        description: "Project updated successfully.",
      });

      router.push(`/admin-dashboard/project-buckets/${projectId}/view`);
    } catch (err) {
      console.error("Failed to update project:", err);
      toast("Error", {
        description: "Failed to update project. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading project details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Link href="/admin-dashboard/project-buckets">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
            <p className="text-muted-foreground">Update project information</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Update the basic details of your project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={project.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter project title"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={project.description || ""}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Describe your project"
                    rows={4}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="objectives">Objectives</Label>
                  <Textarea
                    id="objectives"
                    value={project.objectives || ""}
                    onChange={(e) =>
                      handleInputChange("objectives", e.target.value)
                    }
                    placeholder="What are the main objectives?"
                    rows={3}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    value={project.requirements || ""}
                    onChange={(e) =>
                      handleInputChange("requirements", e.target.value)
                    }
                    placeholder="What are the project requirements?"
                    rows={3}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="deliverables">Deliverables</Label>
                  <Textarea
                    id="deliverables"
                    value={project.deliverables || ""}
                    onChange={(e) =>
                      handleInputChange("deliverables", e.target.value)
                    }
                    placeholder="What will be delivered?"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills & Technologies */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Technologies</CardTitle>
                <CardDescription>
                  Specify the required skills and technologies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="skillsRequired">Required Skills</Label>
                  <Input
                    id="skillsRequired"
                    value={project.skillsRequired || ""}
                    onChange={(e) =>
                      handleInputChange("skillsRequired", e.target.value)
                    }
                    placeholder="e.g., JavaScript, React, Node.js (comma-separated)"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="technologies">Technologies</Label>
                  <Input
                    id="technologies"
                    value={project.technologies || ""}
                    onChange={(e) =>
                      handleInputChange("technologies", e.target.value)
                    }
                    placeholder="e.g., MongoDB, Express, AWS (comma-separated)"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Project Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={project.status || ""}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <Select
                    value={project.difficulty || ""}
                    onValueChange={(value) =>
                      handleInputChange("difficulty", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={project.category || ""}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    placeholder="e.g., Web Development, AI/ML"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="professorId">Professor</Label>
                  <Input
                    id="professorId"
                    value={project.professorId || ""}
                    onChange={(e) =>
                      handleInputChange("professorId", e.target.value)
                    }
                    placeholder="Professor name or ID"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="maxTeams">Max Teams</Label>
                  <Input
                    id="maxTeams"
                    type="number"
                    value={project.maxTeams || ""}
                    onChange={(e) =>
                      handleInputChange("maxTeams", e.target.value)
                    }
                    placeholder="Maximum number of teams"
                    min="1"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={project.budget || ""}
                    onChange={(e) =>
                      handleInputChange("budget", e.target.value)
                    }
                    placeholder="Project budget"
                    min="0"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={project.location || ""}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    placeholder="Project location"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="applicationDeadline">
                    Application Deadline
                  </Label>
                  <Input
                    id="applicationDeadline"
                    type="date"
                    value={project.applicationDeadline || ""}
                    onChange={(e) =>
                      handleInputChange("applicationDeadline", e.target.value)
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="projectDeadline">Project Deadline</Label>
                  <Input
                    id="projectDeadline"
                    type="date"
                    value={project.projectDeadline || ""}
                    onChange={(e) =>
                      handleInputChange("projectDeadline", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-2">
                  <Button type="submit" disabled={saving} className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Link
                    href={`/admin-dashboard/project-buckets/${projectId}/view`}
                  >
                    <Button variant="outline" className="w-full bg-transparent">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}

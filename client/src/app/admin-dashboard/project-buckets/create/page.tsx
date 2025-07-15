"use client";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BasicInformationSection } from "@/components/form-sections/basic-information";
import { TechnicalRequirementsSection } from "@/components/form-sections/technical-requirements";
import { TeamApplicationSection } from "@/components/form-sections/team-application";
import { ProfessorAssignmentSection } from "@/components/form-sections/professor-assignment";
import { ResourcesMaterialsSection } from "@/components/form-sections/resources-materials";
import { AdvancedSettingsSection } from "@/components/form-sections/advanced-settings";
import { ProjectPreview } from "@/components/form-sections/project-preview";
import { toast } from "@/components/ui/sonner";
import { Save, Eye, X, CheckCircle } from "lucide-react";
import { addProject } from "@/lib/projects";
import {
  initialProjectFormData,
  projectFormData,
} from "@/types/projectFormData";

export default function CreateProjectForm() {
  const [showPreview, setShowPreview] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const router = useRouter();
  const [formData, setFormData] = useState<projectFormData>(
    initialProjectFormData
  );

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("project-draft", JSON.stringify(formData));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formData]);

  useEffect(() => {
    const draft = localStorage.getItem("project-draft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setFormData(parsed);
      } catch {
        console.warn("Invalid draft data");
      }
    }
  }, []);

  const updateFormData = useCallback((field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (
        !formData.title ||
        !formData.description ||
        !formData.category ||
        !formData.supervisorId 
      ) {
        toast("Validation Error", {
          description: "Please fill in all required fields.",
        });
        return;
      }

      const response = await addProject(formData);
      localStorage.removeItem("project-draft");
      toast.success(`Congratulations, Project created Successfully!`);
      router.push("/admin-dashboard/project-buckets");
    } catch (error) {
      console.error("Project creation error:", error);
      toast("Error", {
        description: "Failed to create project. Please try again.",
      });
    }
  };

  const saveDraft = useCallback(() => {
    localStorage.setItem("project-draft", JSON.stringify(formData));
    setLastSaved(new Date());
    toast("Draft saved", {
      description: "Your progress has been saved.",
    });
  }, [formData, toast]);

  const handleCancel = useCallback(() => {
    if (
      confirm(
        "Are you sure you want to leave? Any unsaved changes will be lost."
      )
    ) {
      window.history.back();
    }
  }, []);

  const togglePreview = useCallback(() => {
    setShowPreview((prev) => !prev);
  }, []);

  return (
    <div className="container mx-auto max-w-7xl p-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin-dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin-dashboard/project-buckets">
              Project Buckets
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create New</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Create New Project Bucket
        </h1>
        <p className="text-muted-foreground">
          Set up a new project for students to apply and work on
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <BasicInformationSection
              formData={formData}
              updateFormData={updateFormData}
            />
            <TechnicalRequirementsSection
              formData={formData}
              updateFormData={updateFormData}
            />
            <TeamApplicationSection
              formData={formData}
              updateFormData={updateFormData}
            />
            <ProfessorAssignmentSection
              formData={formData}
              updateFormData={updateFormData}
            />
            <ResourcesMaterialsSection
              formData={formData}
              updateFormData={updateFormData}
            />
            <AdvancedSettingsSection
              formData={formData}
              updateFormData={updateFormData}
            />

            {/* Action Buttons */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4">
                  <Button type="submit" className="flex-1 sm:flex-none">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Publish Project
                  </Button>
                  <Button type="button" variant="outline" onClick={saveDraft}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Draft
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={togglePreview}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {showPreview ? "Hide Preview" : "Preview"}
                  </Button>
                  <Button type="button" variant="ghost" onClick={handleCancel}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>

        {showPreview && (
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <ProjectPreview data={formData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
